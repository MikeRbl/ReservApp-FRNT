import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = 'http://localhost:5160/api';

  constructor(private http: HttpClient) { }

  getRestaurantes() {
    return this.http.get<any[]>(`${this.baseUrl}/restaurant/publicos`);
  }

  // Búsqueda con IA (Simulada o Real si creaste el endpoint)
  // Si aún no tienes endpoint de IA en .NET, mantenemos la lógica local temporalmente
  // O idealmente, creas un endpoint en .NET que reciba el query.
  buscarConIA(query: string): Observable<any[]> {
     // Por ahora, para no romper, podrías llamar a getRestaurantes y filtrar aquí,
     // o crear el endpoint '/restaurant/buscar?q=...'
     return this.http.get<any[]>(`${this.baseUrl}/restaurant/publicos`); 
  }

  crearReserva(datos: any) {
    return this.http.post(`${this.baseUrl}/user/reservar`, datos);
  }

  // Simulación: Obtener mis reservas
  getMisReservas() {
    return this.http.get<any[]>(`${this.baseUrl}/user/mis-reservas`);
  }

  // --- MÉTODOS PARA ADMIN RESTAURANTE (NUEVOS) ---

  // 1. Obtener solicitudes de reserva que llegan al restaurante
  getReservasAdmin() {
    return this.http.get<any[]>(`${this.baseUrl}/restaurant/mis-reservas`);
  }

  // 2. Obtener lista de mesas del restaurante
  getMesasAdmin() {
    return this.http.get<any[]>(`${this.baseUrl}/restaurant/mesas`);
  }

  // 3. Acción de aceptar y asignar mesa
  asignarMesa(idReserva: number, idMesa: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/restaurant/aceptar-reserva`, { reservaId: idReserva, mesaId: idMesa });
  }

  // AUTENTICACIÓN
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credenciales);
  }

  registroUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/registro-usuario`, datos);
  }

  registroRestaurante(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/registro-restaurante`, datos);
  }
  
}
