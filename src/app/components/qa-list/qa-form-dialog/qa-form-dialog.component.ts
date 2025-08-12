import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Qa } from '../../../models/qa.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  mode: 'create' | 'edit';
  qa?: Qa;
}

@Component({
  selector: 'app-qa-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './qa-form-dialog.component.html',
  styleUrls: ['./qa-form-dialog.component.css']
})
export class QaFormDialogComponent {
  form: FormGroup;
  mode: 'create' | 'edit';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.mode = data.mode;
    this.form = this.fb.group({
      Comentario: [data.qa?.Comentario || '', Validators.required],
      Respuesta: [data.qa?.Respuesta || '', Validators.required],
      Tema: [data.qa?.Tema || '', Validators.required]
    });

    // Configurar estilos personalizados para el dialog
    this.dialogRef.addPanelClass('custom-dialog-container');
  }

  save(): void {
    if (this.form.valid) {
      let result: any = { ...this.form.value };
      if (this.mode === 'edit' && this.data.qa?.ID) {
        result.ID = this.data.qa.ID;
      }
      this.dialogRef.close(result);
    }
  }
}