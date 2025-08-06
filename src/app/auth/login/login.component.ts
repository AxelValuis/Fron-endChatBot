import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; // <-- 1. Importar FormsModule
import { CommonModule } from '@angular/common'; // <-- 2. Importar CommonModule para *ngIf

@Component({
  selector: 'app-login',
  standalone: true,
  // 3. Añadir FormsModule y CommonModule a los imports del componente
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Variables para almacenar los datos del formulario
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Esta función se llama cuando el usuario envía el formulario
  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        // Si el login es exitoso, navegamos a la página de home
        this.router.navigate(['/home']);
      } else {
        // Si falla, mostramos un mensaje de error
        this.errorMessage = 'Contraseña incorrecta. Inténtalo de nuevo.';
      }
    });
  }
}
