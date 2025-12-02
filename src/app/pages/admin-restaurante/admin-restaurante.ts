import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-admin-restaurante',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-restaurante.html',
  styleUrl: './admin-restaurante.css',
})
export class AdminRestaurante implements OnInit {
  reservas: any[] = [];
  mesas: any[] = [];
  
  // Variables para el Modal de Asignación
  reservaSeleccionada: any = null;
  mesaSeleccionadaId: number | null = null;

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Simulamos carga de datos del backend
    this.api.getReservasAdmin().subscribe(data => this.reservas = data);
    this.api.getMesasAdmin().subscribe(data => this.mesas = data);
  }

  // Abrir modal para una reserva específica
  abrirModalAsignar(reserva: any) {
    this.reservaSeleccionada = reserva;
    this.mesaSeleccionadaId = null; // Resetear selección anterior
    
    const modal = document.getElementById('modal_asignar_mesa') as HTMLDialogElement;
    if(modal) modal.showModal();
  }

  confirmarAsignacion() {
    if (!this.mesaSeleccionadaId || !this.reservaSeleccionada) {
      alert("Por favor selecciona una mesa");
      return;
    }

    this.api.asignarMesa(this.reservaSeleccionada.id, this.mesaSeleccionadaId)
      .subscribe(() => {
        alert("¡Mesa asignada y reserva aceptada!");
        
        // Actualización visual simulada (en backend real esto se recargaría)
        this.reservaSeleccionada.estado = 'Aceptada';
        const mesaEncontrada = this.mesas.find(m => m.id == this.mesaSeleccionadaId);
        this.reservaSeleccionada.mesa = mesaEncontrada.numero;

        const modal = document.getElementById('modal_asignar_mesa') as HTMLDialogElement;
        if(modal) modal.close();
      });
  }
}
