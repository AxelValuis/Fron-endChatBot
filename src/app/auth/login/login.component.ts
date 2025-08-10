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
  email = '';
  password = '';
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
    // Reseteamos los mensajes y activamos el estado de carga
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password)
      .pipe(delay(1000)) // Simula una pequeña demora de la red
      .subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            this.successMessage = '¡Éxito! Redirigiendo al panel...';
            // Esperamos un momento para que el usuario vea el mensaje de éxito
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1500);
          } else {
            this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
          }
        },
        error: (err) => {
          // Manejo de errores si el servicio fallara
          this.isLoading = false;
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo más tarde.';
          console.error(err);
        }
      });
  }
}
