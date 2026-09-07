import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  password = signal('');
  confirmPassword = signal('');

  loading = signal(false);
  error = signal('');
  success = signal('');

  constructor(
    private api: LangApiService,
    private router: Router
  ) {}

  onSignup() {
    this.error.set('');
    this.success.set('');

    if (!this.fullName() || !this.email() || !this.password() || !this.confirmPassword()) {
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

    this.loading.set(true);

    this.api.register({
      email: this.email(),
      password: this.password(),
      full_name: this.fullName()
    }).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        this.success.set('Account created successfully. Please login.');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1200);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err.error?.detail || 'Registration failed'
        );
      }
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}