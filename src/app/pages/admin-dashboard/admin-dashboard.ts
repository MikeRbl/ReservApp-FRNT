import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit{
  solicitudes: any[] = [];
  activos: any[] = [];

  // Control de Tabs: 'pendientes' | 'activos'
  tabActual: string = 'activos';

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarDatos() {
    // 1. Cargar Pendientes
    this.api.getSolicitudesRegistro().subscribe(data => this.solicitudes = data);
    // 2. Cargar Activos
    this.api.getRestaurantesActivos().subscribe(data => this.activos = data);
  }

  
  cargarSolicitudes() {
    this.api.getSolicitudesRegistro().subscribe({
      next: (data) => this.solicitudes = data,
      error: (err) => console.error('Error cargando solicitudes', err)
    });
  }

  aprobar(id: number) {
    if(!confirm('¿Aprobar restaurante?')) return;
    this.api.aprobarRestaurante(id).subscribe(() => {
      this.cargarDatos();
      alert('¡Restaurante aprobado!');
    });
  }

  pausar(id: number) {
    if(!confirm('¿Pausar este restaurante? Dejará de ser visible para los clientes.')) return;
    this.api.pausarRestaurante(id).subscribe(() => {
      this.cargarDatos();
    });
  }

  eliminar(id: number) {
    if(!confirm('¿ESTÁS SEGURO? Se borrará toda la información de este restaurante permanentemente.')) return;
    this.api.eliminarRestaurante(id).subscribe(() => {
      this.cargarDatos();
    });
  }
}
