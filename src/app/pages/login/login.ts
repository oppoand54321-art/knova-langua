import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LangApiService } from '../../core/services/lang-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnDestroy {
  step = signal<'phone' | 'otp'>('phone');
  phone = signal('');
  code = signal('');
  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');
  info = signal('');
  resendIn = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private api: LangApiService,
    private router: Router
  ) {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    this.stopResend();
  }

  private digits(raw: string): string {
    const d = (raw || '').replace(/\D/g, '');
    if (d.startsWith('00')) return d.slice(2);
    return d;
  }

  private e164(raw: string): string {
    const d = this.digits(raw);
    if (!d) return '';
    if (raw.trim().startsWith('+')) return '+' + d;
    if (d.startsWith('92') && d.length >= 12) return '+' + d;
    if (d.startsWith('0') && d.length >= 11) return '+92' + d.slice(1);
    if (d.length === 10) return '+92' + d;
    return '+' + d;
  }

  onPhoneInput(event: Event): void {
    this.phone.set((event.target as HTMLInputElement).value);
  }

  onCodeInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 6);
    this.code.set(v);
  }

  onEmailInput(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  onPasswordInput(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
  }

  sendOtp(): void {
    this.error.set('');
    const phone = this.e164(this.phone());
    if (this.digits(phone).length < 10) {
      this.error.set('Sahi WhatsApp number likho');
      return;
    }
    this.phone.set(phone);
    this.loading.set(true);

    this.api.resendOtp({
      phone_number: phone,
      channel: 'whatsapp'
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.step.set('otp');
        this.info.set('Code WhatsApp pe bhej diya');
        this.startResendCountdown();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.detail || 'OTP nahi gaya');
      }
    });
  }

  verify(): void {
    this.error.set('');
    const code = this.code();
    if (code.length !== 6) {
      this.error.set('6 digit code likho');
      return;
    }
    this.loading.set(true);

    this.api.verifyWhatsapp({
      phone_number: this.phone(),
      code
    }).subscribe({
      next: (res: any) => {
        if (res?.access_token) {
          localStorage.setItem('access_token', res.access_token);
        }
        if (res?.refresh_token) {
          localStorage.setItem('refresh_token', res.refresh_token);
        }
        if (!res?.access_token) {
          this.loading.set(false);
          this.error.set('Verify ho gaya lekin session token nahi aaya');
          return;
        }
        this.api.assignNumber().subscribe({
          next: () => this.goHome(),
          error: () => this.goHome()
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.detail || 'Galat code');
      }
    });
  }

  loginEmail(): void {
    this.error.set('');
    if (!this.email() || !this.password()) {
      this.error.set('Email aur password likho');
      return;
    }
    this.loading.set(true);
    this.api.login({
      email: this.email().trim().toLowerCase(),
      password: this.password()
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.access_token);
        if (res.refresh_token) {
          localStorage.setItem('refresh_token', res.refresh_token);
        }
        this.goHome();
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.detail || 'Login fail');
      }
    });
  }

  private goHome(): void {
    this.loading.set(false);
    this.router.navigate(['/home']);
  }

  startResendCountdown(): void {
    this.stopResend();
    this.resendIn.set(60);
    this.timer = setInterval(() => {
      const n = this.resendIn() - 1;
      this.resendIn.set(n);
      if (n <= 0) this.stopResend();
    }, 1000);
  }

  stopResend(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  backToPhone(): void {
    this.step.set('phone');
    this.code.set('');
    this.error.set('');
    this.info.set('');
  }
}