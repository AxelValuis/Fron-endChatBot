import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Qa } from '../models/qa.model';

@Injectable({ providedIn: 'root' })
export class QaService {
  private apiUrl = 'http://localhost:8000/items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Qa[]> {
    return this.http.get<Qa[]>(this.apiUrl);
  }

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
