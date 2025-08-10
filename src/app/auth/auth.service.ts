import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  // Injectamos PLATFORM_ID para saber dónde se está ejecutando el código.
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // isPlatformBrowser nos dirá si estamos en el navegador o en el servidor.
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<boolean> {
    if ( password === '123456') {
      // Solo usamos localStorage si estamos en el navegador.
      if (this.isBrowser) {
        localStorage.setItem('authToken', 'fake-token-123');
      }
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    // Solo usamos localStorage si estamos en el navegador.
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // Solo usamos localStorage si estamos en el navegador.
    if (this.isBrowser) {
      return !!localStorage.getItem('authToken');
    }
    return false; // En el servidor, el usuario nunca está autenticado.
  }
}