import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Qa } from '../../models/qa.model';
import { QaService } from '../../services/qa.service';

@Component({
  selector: 'app-qa-list', // Asegúrate de que el selector sea este
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qa-list.component.html',
  styleUrls: ['./qa-list.component.css']
})
// Asegúrate de que el nombre de la clase sea este
export class QaListComponent implements OnInit {
  qas: Qa[] = [];

  constructor(private qaService: QaService) {}

  // ngOnInit se ejecuta cuando el componente se inicia
  ngOnInit(): void {
    this.loadQas();
  }

  // Carga los datos desde el servicio
  loadQas(): void {
    this.qaService.getQas().subscribe(data => {
      this.qas = data;
    });
  }

  // Se llama al hacer clic en el botón "Eliminar"
  onDelete(id: number): void {
    // Usamos confirm() para pedir una confirmación al usuario
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      this.qaService.deleteQa(id).subscribe(() => {
        console.log(`Elemento con id ${id} eliminado.`);
        // Volvemos a cargar la lista para que la vista se actualice
        this.loadQas();
      });
    }
  }
}
