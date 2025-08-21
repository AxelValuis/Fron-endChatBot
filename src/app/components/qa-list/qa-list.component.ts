import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaService } from '../../services/qa.service';

// --- IMPORTACIONES DE ANGULAR MATERIAL ---
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { merge, of } from 'rxjs';
import { startWith, switchMap, catchError, map } from 'rxjs/operators';

// --- DIÁLOGOS Y SERVICIOS EXTRA ---
import { QaDeleteDialogComponent } from './qa-delete-dialog/qa-delete-dialog.component';
import { QaFormDialogComponent } from './qa-form-dialog/qa-form-dialog.component';
import { NgxToastrService } from '../../services/ngx-toastr.service';

interface QaMapped {
  nroItem: number;
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: string;
}

@Component({
  selector: 'app-qa-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './qa-list.component.html',
  styleUrls: ['./qa-list.component.css']
})
export class QaListComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['nroItem', 'pregunta', 'respuesta', 'categoria', 'acciones'];
  dataSource = new MatTableDataSource<QaMapped>();

  resultsLength = 0;
  isLoadingResults = true;
  
  // Propiedad para guardar el valor del filtro de búsqueda
  private filterValue = '';

  private toastr = inject(NgxToastrService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private qaService: QaService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    // Cuando el usuario ordena, siempre vuelve a la primera página
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // `merge` combina los eventos de ordenamiento y paginación en un solo stream
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          // Llama al servicio con todos los parámetros actuales
          return this.qaService.getAll(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.filterValue,      // Envía el término de búsqueda
            this.sort.active,      // Envía la columna por la que se ordena (ej: 'Tema')
            this.sort.direction    // Envía la dirección ('asc' o 'desc')
          ).pipe(catchError(() => of(null))); // En caso de error en la API, continúa
        }),
        map(data => {
          this.isLoadingResults = false;

          if (data === null) {
            this.resultsLength = 0;
            return [];
          }

          this.resultsLength = data.total_items;
          return data.items.map(item => ({
            nroItem: item.NroItem!,
            id: item.ID,
            pregunta: item.Comentario,
            respuesta: item.Respuesta,
            categoria: item.Tema
          }));
        })
      ).subscribe(mappedData => {
        this.dataSource.data = mappedData;
      });
  }
  
  // --- MÉTODO applyFilter MODIFICADO ---
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Guarda el valor para que la próxima llamada a la API lo use
    this.filterValue = filterValue.trim().toLowerCase();
    
    // Vuelve a la primera página cada vez que buscas
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    
    // Dispara el evento `page` del paginador para que el `merge` en ngAfterViewInit
    // se active y recargue los datos desde el servidor con el nuevo filtro
    this.paginator.page.emit(); 
  }

  // --- El resto de tus métodos ---

  private reloadData() {
    this.paginator.page.emit();
  }
  
  clearFilter(input: HTMLInputElement) {
    input.value = '';
    // Dispara el applyFilter con un valor vacío para recargar
    this.applyFilter({ target: input } as any);
  }

  get totalQuestions() {
    return this.resultsLength;
  }

  get totalCategories() {
    const categories = new Set(this.dataSource.data.map(item => item.categoria));
    return categories.size;
  }
  
  onDelete(id: number) {
    const dialogRef = this.dialog.open(QaDeleteDialogComponent, { width: '500px', data: { id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.qaService.delete(id).subscribe({
          next: () => {
            this.toastr.showSuccess('El registro se eliminó permanentemente.', '¡Eliminado!');
            this.reloadData();
          },
          error: () => {
            this.toastr.showError('No se pudo eliminar el registro.', 'Error');
          }
        });
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(QaFormDialogComponent, { width: '500px', data: { mode: 'create' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.qaService.create(result).subscribe({
          next: () => {
            this.toastr.showSuccess('El registro se creó exitosamente.', '¡Éxito!');
            this.reloadData();
          },
          error: () => {
            this.toastr.showError('No se pudo crear el registro.', 'Error');
          }
        });
      }
    });
  }

  onEdit(id: number, pregunta: string, respuesta: string, categoria: string) {
    const dialogRef = this.dialog.open(QaFormDialogComponent, {
      width: '500px',
      data: { mode: 'edit', qa: { ID: id, Comentario: pregunta, Respuesta: respuesta, Tema: categoria } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.qaService.update(result.ID, result).subscribe({
          next: () => {
            this.toastr.showSuccess('El registro se actualizó correctamente.', '¡Actualizado!');
            this.reloadData();
          },
          error: () => {
            this.toastr.showError('No se pudo actualizar el registro.', 'Error');
          }
        });
      }
    });
  }
}