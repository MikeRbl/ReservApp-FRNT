import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  // Control de Vistas: 'login', 'registro-user', 'registro-restaurante'
  vistaActual: string = 'login';

  // Modelos de datos
  loginData = { email: '', password: '' };
  
  registroUserData = { nombre: '', email: '', password: '', telefono: '' };
  
  registroRestauranteData = { 
    nombreDueno: '', email: '', password: '', telefonoDueno: '',
    nombreRestaurante: '', direccion: '', descripcion: '', telefonoRestaurante: ''
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
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Error: ' + err.error);
        this.isLoading = false;
      }
    });
  }

  // Acción Registro Usuario
  onRegistroUser() {
    this.api.registroUsuario(this.registroUserData).subscribe({
      next: () => {
        alert('Cuenta creada exitosamente. Ahora inicia sesión.');
        this.vistaActual = 'login';
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
      },
      error: (err) => alert('Error al registrar: ' + err.error)
    });
  }
}
