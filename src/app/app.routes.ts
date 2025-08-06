import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';

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
    path: '',
    redirectTo: '/home', // Aseguramos que la redirección sea explícita
    pathMatch: 'full'
  },
  {
    path: '**', // Cualquier otra ruta no encontrada
    redirectTo: '/login' // La mandamos al login
  }
];
