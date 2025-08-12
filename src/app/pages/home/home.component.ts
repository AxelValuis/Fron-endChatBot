import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { QaListComponent } from '../../components/qa-list/qa-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../pages/change-password/change-password.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    QaListComponent, 
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  logout(): void {
    this.authService.logout();
  }
    
openChangePasswordPage(): void {
  this.router.navigate(['change-password']);
}

  redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
