import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Aquí proveemos el Router a toda la aplicación del lado del cliente
    provideRouter(routes),

    // Proveedores para SSR y para hacer llamadas a APIs
    provideClientHydration(),
    provideHttpClient(withFetch())
  ]
};
