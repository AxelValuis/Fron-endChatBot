import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http'; // 1. Importa HttpErrorResponse
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/auth.service';
import { ChangePasswordPayload } from '../../models/auth.models';
import { Router } from '@angular/router';
import { NgxToastrService } from '../../services/ngx-toastr.service';



@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  form: FormGroup;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

    private toastr = inject(NgxToastrService);

  constructor(
    private router: Router
  ) {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(17),
        this.passwordValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

    logout(): void {
    this.authService.logout();
  }
    

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // 3. Usa la clave correcta: 'userEmail'
    const loggedInUser = localStorage.getItem('userEmail');

    if (!loggedInUser) {
      alert('Error: No se pudo encontrar el usuario. Por favor, inicie sesión de nuevo.');
      return;
    }

    const { currentPassword, newPassword } = this.form.value;

    const payload: ChangePasswordPayload = {
      user: loggedInUser,
      old_password: currentPassword,
      new_password: newPassword
    };

    // 4. Añade los tipos a 'response' y 'err'
    this.authService.changePassword(payload).subscribe({
      next: (response: any) => { // Puedes usar un tipo más específico si lo tienes
        console.log('Respuesta del servidor:', response);
        this.toastr.showSuccess('¡Contraseña cambiada con éxito!', 'Éxito');
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cambiar la contraseña:', err);
        const detail = err.error?.detail || 'Ocurrió un error inesperado.';
        // --- REEMPLAZA ALERT POR TOASTR.SHOWERROR ---
        this.toastr.showError(detail, 'Error');
      }
    });
  }

    redirectToHome(): void {
    this.router.navigate(['/']);
  }

  // --- El resto de tus métodos validadores (sin cambios) ---
  passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasSpacesAtEnds = /^\s|\s$/.test(value);
    const valid = hasLower && hasUpper && hasNumber && hasSpecial && !hasSpacesAtEnds;
    return valid ? null : { 'passwordStrength': true };
  }

  passwordMatchValidator(group: AbstractControl): {[key: string]: any} | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }

  hasMinLength = (): boolean => (this.form.get('newPassword')?.value || '').length >= 8;
  hasMaxLength = (): boolean => (this.form.get('newPassword')?.value || '').length <= 17;
  hasLowercase = (): boolean => /[a-z]/.test(this.form.get('newPassword')?.value || '');
  hasUppercase = (): boolean => /[A-Z]/.test(this.form.get('newPassword')?.value || '');
  hasNumber = (): boolean => /\d/.test(this.form.get('newPassword')?.value || '');
  hasSpecialChar = (): boolean => /[!@#$%^&*(),.?":{}|<>]/.test(this.form.get('newPassword')?.value || '');
  hasSpacesAtEnds = (): boolean => /^\s|\s$/.test(this.form.get('newPassword')?.value || '');
}