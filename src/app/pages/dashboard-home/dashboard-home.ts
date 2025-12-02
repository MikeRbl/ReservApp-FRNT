import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome implements OnInit {
  restaurantes: any[] = [];

  // Variables para la Búsqueda IA
  searchQuery: string = '';
  mensajeIA: string = '';
  estaBuscando: boolean = false;

  // Variables para controlar el formulario
  restauranteSeleccionado: any = null;
  reservaData = {
    nombre: '',
    fecha: '',
    hora: ''
  };

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getRestaurantes().subscribe(data => {
      this.restaurantes = data;
    });
  }

  cargarTodos() {
    this.api.getRestaurantes().subscribe(data => this.restaurantes = data);
  }

  realizarBusqueda() {
    if (!this.searchQuery.trim()) {
      this.mensajeIA = '';
      this.cargarTodos();
      return;
    }

    this.estaBuscando = true;
    
    // Simulamos un pequeño delay para que parezca que la IA está "pensando"
    setTimeout(() => {
      this.api.buscarConIA(this.searchQuery).subscribe(resultados => {
        this.restaurantes = resultados;
        this.estaBuscando = false;

        if (resultados.length > 0) {
          this.mensajeIA = `¡Entendido! Aquí tienes opciones para "${this.searchQuery}" 🤖`;
        } else {
          this.mensajeIA = `Ups, no encontré nada específico para "${this.searchQuery}", pero mira todo lo que tenemos:`;
          this.cargarTodos(); // Restaurar lista si no hay nada
        }
      });
    }, 800); // 800ms de "pensamiento"
  }
  // Método para abrir el modal
  abrirModal(restaurante: any) {
    this.restauranteSeleccionado = restaurante;
    // Limpiamos el formulario
    this.reservaData = { nombre: '', fecha: '', hora: '' };
    
    // Abrimos el modal usando ID (DaisyUI usa el tag nativo <dialog>)
    const modal = document.getElementById('modal_reserva') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  // Método para enviar la reserva
  confirmarReserva() {
    if (!this.reservaData.nombre || !this.reservaData.fecha || !this.reservaData.hora) {
      alert('Por favor completa todos los campos');
      return;
    }

  const payload = {
      restauranteId: this.restauranteSeleccionado.id,
      nombreCliente: this.reservaData.nombre,
      fechaHora: `${this.reservaData.fecha}T${this.reservaData.hora}`
    };

    // Llamamos al servicio (simulado)
    this.api.crearReserva(payload).subscribe(() => {
      alert(`¡Solicitud enviada a ${this.restauranteSeleccionado.nombre}!`);
      
      // Cerramos el modal
      const modal = document.getElementById('modal_reserva') as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    });
  }

}
