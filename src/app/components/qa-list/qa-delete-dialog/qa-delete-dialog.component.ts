import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Qa } from '../../../models/qa.model';

@Component({
  selector: 'app-qa-delete-dialog',
  templateUrl: './qa-delete-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  styleUrls: ['./qa-delete-dialog.component.css']
})
export class QaDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QaDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { qa: Qa }
  ) {
    // Configurar estilos personalizados para el dialog
    this.dialogRef.addPanelClass('custom-delete-dialog-container');
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}