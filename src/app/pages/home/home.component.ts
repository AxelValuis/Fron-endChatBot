import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { QaListComponent } from '../../components/qa-list/qa-list.component'; // <-- 1. Importar nuestro componente

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    QaListComponent // <-- 2. Añadirlo a los imports
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) {}

  // 3. Esta función se llama desde el botón en el HTML
  logout(): void {
    this.authService.logout();
  }
}
