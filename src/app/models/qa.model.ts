// Esta interfaz define la estructura para cada par de pregunta y respuesta.
export interface Qa {
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: 'Saludos' | 'Ventas' | 'Soporte' | 'General';
}
