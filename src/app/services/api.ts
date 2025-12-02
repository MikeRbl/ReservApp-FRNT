import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private restaurantesDB = [
    { 
      id: 1, 
      nombre: 'La Casa del Taco', 
      direccion: 'Av. Principal 123', 
      imagen: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
      tags: ['taco', 'mexicana', 'carne', 'picante', 'cena', 'pastor'] 
    },
    { 
      id: 2, 
      nombre: 'Sushi Master', 
      direccion: 'Plaza Central', 
      imagen: 'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp',
      tags: ['sushi', 'japonés', 'asiática', 'pescado', 'arroz', 'mariscos']
    },
    { 
      id: 3, 
      nombre: 'Pizza & Love', 
      direccion: 'Calle 50', 
      imagen: 'https://img.daisyui.com/images/stock/photo-1567620905732-2d1ec7ab7445.webp',
      tags: ['pizza', 'italiana', 'pasta', 'romántico', 'queso']
    }
  ];

  constructor() { }

  getRestaurantes() {
    return of(this.restaurantesDB);
  }

  // --- NUEVO: Motor de Búsqueda "IA" ---
  buscarConIA(query: string) {
    const texto = query.toLowerCase();
    
    // Filtramos si alguna etiqueta coincide con lo que el usuario escribió
    const resultados = this.restaurantesDB.filter(rest => {
      // Busca si el nombre o alguna tag está incluida en la frase del usuario
      const coincideNombre = rest.nombre.toLowerCase().includes(texto);
      const coincideTag = rest.tags.some(tag => texto.includes(tag));
      return coincideNombre || coincideTag;
    });

    return of(resultados);
  }

  // Simulación: Obtener mis reservas
  getMisReservas() {
    return of([
      { id: 101, restaurante: 'La Casa del Taco', fecha: '2024-11-20 19:00', personas: 4, estado: 'Pendiente' },
      { id: 102, restaurante: 'Sushi Master', fecha: '2024-11-15 21:00', personas: 2, estado: 'Aceptada' },
      { id: 103, restaurante: 'Pizza & Love', fecha: '2024-10-01 14:00', personas: 5, estado: 'Cancelada' }
    ]);
  }

  crearReserva(datos: any) {
    console.log("Enviando reserva al backend:", datos);
    return of({ success: true });
  }

  // --- MÉTODOS PARA ADMIN RESTAURANTE (NUEVOS) ---

  // 1. Obtener solicitudes de reserva que llegan al restaurante
  getReservasAdmin() {
    return of([
      { id: 201, cliente: 'Carlos López', fecha: '2025-12-01 20:00', personas: 4, estado: 'Pendiente' },
      { id: 202, cliente: 'Ana Torres', fecha: '2025-12-01 21:30', personas: 2, estado: 'Pendiente' },
      { id: 203, cliente: 'Luis Miguel', fecha: '2025-12-02 14:00', personas: 6, estado: 'Aceptada', mesa: 'Mesa VIP 1' }
    ]);
  }

  // 2. Obtener lista de mesas del restaurante
  getMesasAdmin() {
    return of([
      { id: 1, numero: 'Mesa 1', capacidad: 4, ubicacion: 'Interior' },
      { id: 2, numero: 'Mesa 2', capacidad: 2, ubicacion: 'Interior' },
      { id: 3, numero: 'Terraza A', capacidad: 6, ubicacion: 'Exterior' },
      { id: 4, numero: 'Barra', capacidad: 1, ubicacion: 'Barra' }
    ]);
  }

  // 3. Acción de aceptar y asignar mesa
  asignarMesa(idReserva: number, idMesa: number) {
    console.log(`Admin Restaurante asignó la reserva ${idReserva} a la mesa ${idMesa}`);
    return of({ success: true });
  }
  
}
