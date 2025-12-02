import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-dashboard-home',
  imports: [],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome implements OnInit {
  restaurantes: any[] = [];

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getRestaurantes().subscribe(data => {
      this.restaurantes = data;
    });
  }

  reservar(id: number) {
    alert(`Abriendo formulario de reserva para restaurante ID: ${id}`);
    // Aquí abrirías un modal para seleccionar fecha
  }

}
