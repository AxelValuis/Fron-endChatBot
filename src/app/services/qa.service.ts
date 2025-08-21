import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Qa } from '../models/qa.model';

@Injectable({ providedIn: 'root' })
export class QaService {
  private apiUrl = 'http://localhost:8000/items';

  constructor(private http: HttpClient) {}

  // --- FUNCIÓN MODIFICADA ---
  getAll(
    page: number, 
    pageSize: number,
    search?: string,     // <-- Nuevo parámetro opcional
    sortBy?: string,     // <-- Nuevo parámetro opcional
    sortOrder?: string   // <-- Nuevo parámetro opcional
  ): Observable<PaginatedResponse> {
    
    let params = new HttpParams()
      .set('page', page)
      .set('page_size', pageSize);

    // Añade los nuevos parámetros solo si tienen un valor
    if (search) {
      params = params.set('search', search);
    }
    if (sortBy && sortOrder) {
      params = params.set('sort_by', sortBy);
      params = params.set('sort_order', sortOrder);
    }
    
    return this.http.get<PaginatedResponse>(this.apiUrl, { params });
  }

  // Las demás funciones (getById, create, update, delete) no necesitan cambios
  getById(id: number): Observable<Qa> {
    return this.http.get<Qa>(`${this.apiUrl}/${id}`);
  }

  create(data: Omit<Qa, 'ID'>): Observable<Qa> {
    return this.http.post<Qa>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Qa>): Observable<Qa> {
    return this.http.put<Qa>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<Qa> {
    return this.http.delete<Qa>(`${this.apiUrl}/${id}`);
  }
}