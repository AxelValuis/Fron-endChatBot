import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// Unimos la configuración base (del cliente) con la del servidor
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

// Esta es la configuración final y completa que usará el servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);
