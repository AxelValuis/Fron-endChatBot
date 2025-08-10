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

@Component({
  selector: 'app-qa-list',
  standalone: true,
  imports: [
    CommonModule,
    // --- AÑADIR MÓDULOS DE LA TABLA ---
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
export class QaListComponent implements OnInit, AfterViewInit {
  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'pregunta', 'respuesta', 'categoria', 'acciones'];
  // Fuente de datos para la tabla
  dataSource: MatTableDataSource<Qa>;

  // Referencias al paginador y al ordenador de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private qaService: QaService) {
    // Inicializamos el dataSource vacío
    this.dataSource = new MatTableDataSource<Qa>([]);
  }

  ngOnInit(): void {
    this.loadQas();
  }

  // Se ejecuta después de que la vista se ha inicializado
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadQas(): void {
    this.qaService.getQas().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // Aplica el filtro a la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      this.qaService.deleteQa(id).subscribe(() => {
        this.loadQas(); // Recargamos los datos
      });
    }
  }
}
