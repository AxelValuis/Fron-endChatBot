import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

// --- IMPORTACIONES DE ANGULAR MATERIAL ---
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para "Recordar sesión"
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para el estado de carga
import { LoginResponse } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // --- AÑADIR MÓDULOS AL COMPONENTE ---
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  // --- Propiedades para el formulario ---
  email = 'gbackus@seal.com.pe';
  password = 'MetaAICose4l20.25';
  rememberMe = false;

  // --- Propiedades para la UI ---
  hidePassword = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // --- Función para mostrar/ocultar la contraseña ---
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // --- Función principal de envío del formulario ---
onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      // El parámetro 'response' ahora es del tipo LoginResponse
      next: (response: LoginResponse) => {
        this.isLoading = false;

        // 2. Guardamos el TOKEN REAL que viene del API
        localStorage.setItem('authToken', response.access_token);
        
        // 3. Guardamos el email que se usó para el login
        localStorage.setItem('userEmail', this.email);

        this.successMessage = '¡Éxito! Redirigiendo al panel...';
        
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 400 || err.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo más tarde.';
        }
        console.error(err);
      }
    });
  }
}
