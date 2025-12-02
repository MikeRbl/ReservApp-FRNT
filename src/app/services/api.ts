import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor() { }

  // Simulación: Obtener restaurantes
  getRestaurantes() {
    return of([
      { id: 1, nombre: 'La Casa del Taco', direccion: 'Av. Principal 123', imagen: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp' },
      { id: 2, nombre: 'Sushi Master', direccion: 'Plaza Central', imagen: 'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp' },
      { id: 3, nombre: 'Pizza & Love', direccion: 'Calle 50', imagen: 'https://img.daisyui.com/images/stock/photo-1567620905732-2d1ec7ab7445.webp' }
    ]);
  }

  // Simulación: Obtener mis reservas
  getMisReservas() {
    return of([
      { id: 101, restaurante: 'La Casa del Taco', fecha: '2024-11-20 19:00', personas: 4, estado: 'Pendiente' },
      { id: 102, restaurante: 'Sushi Master', fecha: '2024-11-15 21:00', personas: 2, estado: 'Aceptada' },
      { id: 103, restaurante: 'Pizza & Love', fecha: '2024-10-01 14:00', personas: 5, estado: 'Cancelada' }
    ]);
  }
  
}
