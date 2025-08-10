import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qa } from '../../models/qa.model';
import { QaService } from '../../services/qa.service';

// --- IMPORTACIONES DE ANGULAR MATERIAL PARA LA TABLA ---
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QaDeleteDialogComponent } from './qa-delete-dialog/qa-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { QaFormDialogComponent } from './qa-form-dialog/qa-form-dialog.component';
interface QaMapped {
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: string;
}

@Component({
  selector: 'app-qa-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './qa-list.component.html',
  styleUrls: ['./qa-list.component.css']
})
export class QaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'pregunta', 'respuesta', 'categoria', 'acciones'];
  dataSource = new MatTableDataSource<QaMapped>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private qaService: QaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.qaService.getAll().subscribe(apiData => {

      const mappedData: QaMapped[] = apiData.map((item) => ({
        id: item.ID,
        pregunta: item.Comentario,
        respuesta: item.Respuesta,
        categoria: item.Tema
      }));

      this.dataSource.data = mappedData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(QaDeleteDialogComponent, {
      width: '500px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.qaService.delete(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        });
      }
    });
  }

openCreateDialog() {
    const dialogRef = this.dialog.open(QaFormDialogComponent, {
      width: '500px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.qaService.create(result).subscribe(newQa => {
          this.dataSource.data = [
            ...this.dataSource.data,
            {
              id: newQa.ID,
              pregunta: newQa.Comentario,
              respuesta: newQa.Respuesta,
              categoria: newQa.Tema
            }
          ];
        });
      }
    });
  }


  getCategoryIcon(categoria: string): string {
  const icons: { [key: string]: string } = {
    'Saludos': 'waving_hand',
    'Ventas': 'shopping_cart',
    'Soporte': 'support_agent',
    'Productos': 'inventory',
    'Reclamos': 'report_problem',
    'General': 'help'
  };
  return icons[categoria] || 'help';
}

get totalQuestions() {
  return this.dataSource?.data?.length || 0;
}

get totalCategories() {
  const categories = new Set(this.dataSource?.data?.map(item => item.categoria));
  return categories.size;
}
  clearFilter(input: HTMLInputElement) {
  input.value = '';
  this.applyFilter({ target: { value: '' } } as any);
}

  onEdit(id: number, pregunta: string, respuesta: string, categoria: string) {
    const dialogRef = this.dialog.open(QaFormDialogComponent, {
      width: '500px',
      data: {
        mode: 'edit',
        qa: { ID: id, Comentario: pregunta, Respuesta: respuesta, Tema: categoria }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.qaService.update(result.ID, result).subscribe(updatedQa => {
          const index = this.dataSource.data.findIndex(q => q.id === result.ID);
          if (index > -1) {
            this.dataSource.data[index] = {
              id: updatedQa.ID,
              pregunta: updatedQa.Comentario,
              respuesta: updatedQa.Respuesta,
              categoria: updatedQa.Tema
            };
            this.dataSource._updateChangeSubscription();
          }
        });
      }
    });
  }
}