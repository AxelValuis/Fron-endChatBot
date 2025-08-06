import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Qa } from '../models/qa.model';

@Injectable({
  providedIn: 'root'
})
export class QaService {

  // Simulación de una base de datos con datos de prueba para el chatbot
  private qas: Qa[] = [
    { id: 1, pregunta: 'Hola, ¿cómo estás?', respuesta: '¡Hola! Estoy aquí para ayudarte. ¿En qué puedo asistirte?', categoria: 'Saludos' },
    { id: 2, pregunta: '¿Cuáles son los precios?', respuesta: 'Tenemos varios planes. El plan básico cuesta $10/mes y el plan premium $25/mes.', categoria: 'Ventas' },
    { id: 3, pregunta: 'Mi cuenta no funciona', respuesta: 'Lamento escuchar eso. Por favor, contacta a nuestro equipo de soporte en soporte@empresa.com.', categoria: 'Soporte' },
    { id: 4, pregunta: '¿Qué tiempo hace hoy?', respuesta: 'Soy un bot de asistencia, no puedo darte información del clima.', categoria: 'General' },
  ];

  constructor() { }

  // READ: Devuelve todos los Q&As
  getQas(): Observable<Qa[]> {
    return of(this.qas);
  }

  // DELETE: Elimina un Q&A por su ID
  deleteQa(id: number): Observable<void> {
    this.qas = this.qas.filter(qa => qa.id !== id);
    return of(undefined);
  }

  // CREATE (lo usaremos más adelante)
  addQa(qa: Omit<Qa, 'id'>): Observable<Qa> {
    const newId = this.qas.length > 0 ? Math.max(...this.qas.map(q => q.id)) + 1 : 1;
    const newQa: Qa = { id: newId, ...qa };
    this.qas.push(newQa);
    return of(newQa);
  }

  // UPDATE (lo usaremos más adelante)
  updateQa(updatedQa: Qa): Observable<Qa> {
    const index = this.qas.findIndex(qa => qa.id === updatedQa.id);
    if (index !== -1) {
      this.qas[index] = updatedQa;
      return of(updatedQa);
    }
    return throwError(() => new Error('Q&A not found'));
  }
}
