import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    redirectTo: '/home', 
    pathMatch: 'full'
  },
  {
    path: '**', 
    redirectTo: '/login' 
  }
];
