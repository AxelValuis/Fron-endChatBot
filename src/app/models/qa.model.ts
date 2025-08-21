export interface Qa {
  ID: number;
  Comentario: string;
  Respuesta: string;
  Tema: string;
  NroItem?: number;
}

export interface PaginatedResponse {
  total_items: number;
  items: Qa[];
  // Puedes añadir total_pages y current_page si los necesitas
}

export interface QaMapped {
  nroItem: number;
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: string;
}