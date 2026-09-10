import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { LangApiService } from '../../core/services/lang-api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  fullName = signal('');
  email = signal('');
  phoneNumber = signal('');
  password = signal('');
  confirmPassword = signal('');

  otpCode = signal('');
  otpMode = signal(false);

  loading = signal(false);
  error = signal('');
  success = signal('');

  resendCountdown = signal(0);

  private baseUrl = environment.apiUrl;
  private resendTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private api: LangApiService,
    private http: HttpClient,
    private router: Router
  ) {}

  onSignup(): void {
    this.error.set('');
    this.success.set('');

    if (
      !this.fullName().trim() ||
      !this.email().trim() ||
      !this.phoneNumber().trim() ||
      !this.password() ||
      !this.confirmPassword()
    ) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      this.error.set('Passwords do not match');
      return;
    }

    if (this.password().length < 6) {
      this.error.set('Password must be at least 6 characters');
      return;
    }

    if (this.phoneNumber().trim().length < 5) {
      this.error.set('Please enter a valid phone number');
      return;
    }

    this.loading.set(true);

    this.api.register({
      email: this.email().trim(),
      password: this.password(),
      full_name: this.fullName().trim(),
      phone_number: this.phoneNumber().trim()
    }).subscribe({
      next: () => {
        this.loading.set(false);

        this.error.set('');

        this.success.set(
          'Account created. A verification code has been sent to your email.'
        );

        this.otpCode.set('');
        this.otpMode.set(true);

        this.startResendCountdown();
      },

      error: () => {
        this.loading.set(false);

        // Any registration error opens OTP verification screen.
        this.error.set('');

        this.success.set(
          'This account already exists. Please enter the verification code sent to your email.'
        );

        this.otpCode.set('');
        this.otpMode.set(true);

        this.startResendCountdown();
      }
    });
  }

  onOtpInput(value: string): void {
    const cleaned = value.replace(/\D/g, '').slice(0, 6);

    this.otpCode.set(cleaned);
    this.error.set('');
  }

  verifyEmail(): void {
    this.error.set('');
    this.success.set('');

    const email = this.email().trim().toLowerCase();
    const code = this.otpCode().trim();

    if (!email) {
      this.error.set('Email is required');
      return;
    }

    if (code.length !== 6) {
      this.error.set('Please enter the 6-digit verification code');
      return;
    }

    this.loading.set(true);

    this.http.post(
      `${this.baseUrl}/auth/verify-email`,
      {
        email,
        code
      }
    ).subscribe({
      next: () => {

        // Email verification succeeded.
        // Now automatically login so the access token is created
        // and available for authenticated Home API requests.
        this.api.login({
          email,
          password: this.password()
        }).subscribe({
          next: (res: any) => {

            if (res?.access_token) {
              localStorage.setItem(
                'access_token',
                res.access_token
              );
            }

            if (res?.refresh_token) {
              localStorage.setItem(
                'refresh_token',
                res.refresh_token
              );
            }

            this.loading.set(false);

            this.success.set(
              'Email verified successfully. Your LANG number is being assigned.'
            );

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 800);
          },

          error: (err) => {
            this.loading.set(false);
            this.handleError(
              err,
              'Email verified, but automatic login failed. Please login manually.'
            );
          }
        });
      },

      error: (err) => {
        this.loading.set(false);
        this.handleError(err, 'Verification failed');
      }
    });
  }

  resendOtp(): void {
    if (this.resendCountdown() > 0 || this.loading()) {
      return;
    }

    this.error.set('');
    this.success.set('');

    const email = this.email().trim().toLowerCase();

    if (!email) {
      this.error.set('Email is required');
      return;
    }

    this.loading.set(true);

    this.http.post(
      `${this.baseUrl}/auth/resend-otp`,
      {
        email,
        channel: 'email'
      }
    ).subscribe({
      next: (res: any) => {
        this.loading.set(false);

        this.success.set(
          res?.message ||
          'A new verification code has been sent to your email.'
        );

        this.otpCode.set('');
        this.startResendCountdown();
      },

      error: (err) => {
        this.loading.set(false);
        this.handleError(
          err,
          'Could not resend verification code'
        );
      }
    });
  }

  backToSignup(): void {
    this.error.set('');
    this.success.set('');
    this.otpCode.set('');
    this.otpMode.set(false);
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  private startResendCountdown(): void {
    this.stopResendCountdown();

    this.resendCountdown.set(60);

    this.resendTimer = setInterval(() => {
      const current = this.resendCountdown();

      if (current <= 1) {
        this.resendCountdown.set(0);
        this.stopResendCountdown();
        return;
      }

      this.resendCountdown.set(current - 1);
    }, 1000);
  }

  private stopResendCountdown(): void {
    if (this.resendTimer) {
      clearInterval(this.resendTimer);
      this.resendTimer = null;
    }
  }

  private handleError(
    err: any,
    fallback: string
  ): void {
    const detail = err?.error?.detail;

    if (typeof detail === 'string') {
      this.error.set(detail);
      return;
    }

    if (Array.isArray(detail)) {
      const messages = detail
        .map((item: any) => {
          if (typeof item === 'string') {
            return item;
          }

          if (item?.msg) {
            return item.msg;
          }

          return null;
        })
        .filter(Boolean);

      this.error.set(
        messages.length > 0
          ? messages.join(', ')
          : fallback
      );

      return;
    }

    this.error.set(fallback);
  }
}