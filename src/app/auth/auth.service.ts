import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Asegúrate de que ambas interfaces estén importadas
import { LoginResponse, ChangePasswordPayload } from '../models/auth.models';
import { environment } from '../../environments/environment'; // <-- 1. IMPORTA EL ENTORNO

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 2. USA LA VARIABLE DEL ENTORNO
  private apiUrl = environment.apiUrl;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Realiza el login y devuelve el token de acceso.
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const body = { user: email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }

  /**
   * ---- AÑADE ESTE MÉTODO ----
   * Envía la petición para cambiar la contraseña del usuario.
   */
  changePassword(data: ChangePasswordPayload): Observable<any> {
    // La respuesta exitosa puede ser un objeto como { message: '...' }
    return this.http.post<any>(`${this.apiUrl}/login/change-password`, data);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
}