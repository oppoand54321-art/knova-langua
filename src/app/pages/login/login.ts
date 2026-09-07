import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LangApiService } from '../../core/services/lang-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal('');

  constructor(
    private api: LangApiService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.email() || !this.password()) {
      this.error.set('Email and password required');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.api.login({
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.access_token);

        if (res.refresh_token) {
          localStorage.setItem('refresh_token', res.refresh_token);
        }

        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.detail || 'Login failed');
      }
    });
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }
}