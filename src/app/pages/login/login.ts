import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  // Control de Vistas: 'login', 'registro-user', 'registro-restaurante'
  vistaActual: string = 'login';

  // Modelos de datos
  loginData = { email: '', password: '' };
  
  registroUserData = { 
    nombre: '',
    apellidoPaterno: '', 
    apellidoMaterno: '',
    email: '',
    password: '',
    telefono: '',
    confirmPassword: '' 
  };
  
  registroRestauranteData = { 
    nombreRestaurante: '',
    email: '',
    password: '',
    telefono: ''
  };

  isLoading = false;

  constructor(private api: Api, private router: Router) {}

  // Acción de Login
  onLogin() {
    this.isLoading = true;
    this.api.login(this.loginData).subscribe({
      next: (res: any) => {
        // Guardar token en localStorage (muy importante)
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        
        alert(`Bienvenido ${res.rol}`);

        if (res.rol === 'Admin') {
        this.router.navigate(['/dashboard/admin-super']); // <--- Admin va a su oficina
        } else {
       this.router.navigate(['/dashboard']); // Los demás van al home normal
        }
      },
      error: (err) => {
        alert('Error: ' + err.error);
        this.isLoading = false;
      }
    });
  }

  // Acción Registro Usuario
  onRegistroUser() {
    // 1. Validar contraseñas
    if (this.registroUserData.password !== this.registroUserData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // 2. Validar campos obligatorios (opcional pero recomendado)
    if (!this.registroUserData.nombre || !this.registroUserData.apellidoPaterno || !this.registroUserData.email) {
       alert('Por favor completa los campos obligatorios');
       return;
    }

    // Enviamos los datos (La API ignorará 'confirmPassword' si no está en el DTO, o enviamos un objeto limpio)
    const dataToSend = { ...this.registroUserData };
    // @ts-ignore
    delete dataToSend.confirmPassword; // Borramos este campo antes de enviar para limpiar

    this.api.registroUsuario(dataToSend).subscribe({
      next: () => {
        alert('Cuenta creada exitosamente. Ahora inicia sesión.');
        this.vistaActual = 'login';
        // Limpiar formulario opcionalmente
      },
      error: (err) => alert('Error al registrar: ' + err.error)
    });
  }

  // Acción Registro Restaurante
  onRegistroRestaurante() {
    this.api.registroRestaurante(this.registroRestauranteData).subscribe({
      next: () => {
        alert('Solicitud enviada. Un administrador revisará tu restaurante.');
        this.vistaActual = 'login';
        
        // Limpiar formulario
        this.registroRestauranteData = { nombreRestaurante: '', email: '', password: '', telefono: '' };
      },
      error: (err) => alert('Error al registrar: ' + err.error)
    });
  }
}
