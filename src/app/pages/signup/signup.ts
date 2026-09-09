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
phoneNumber = signal('');
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

if (
  !this.fullName() ||
  !this.email() ||
  !this.phoneNumber() ||
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
  next: (res: any) => {
    this.loading.set(false);
    this.success.set(
      'Account created successfully. Please login.'
    );

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  },

  error: (err) => {
    this.loading.set(false);

    const detail = err.error?.detail;

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
          : 'Registration failed'
      );

      return;
    }

    this.error.set('Registration failed');
  }
});

}

onLogin() {
this.router.navigate(['/login']);
}
}