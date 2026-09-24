import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Landing } from './pages/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: Landing
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  }
];