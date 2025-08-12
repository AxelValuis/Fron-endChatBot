import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/login';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ id: number, user: string }>(this.apiUrl, { user: email, password })
      .pipe(
        map(response => {
          if (response && response.user) {
            if (this.isBrowser) {
              // Guardamos algo como token, aunque ahora sea simulado
              localStorage.setItem('authToken', 'fake-token-123');
              localStorage.setItem('userEmail', response.user);
            }
            return true;
          }
          return false;
        })
      );
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
