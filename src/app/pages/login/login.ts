import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) {}

  onLogin() {
    // Aquí irá luego la lógica real de autenticación con tu API .NET
    console.log("Iniciando sesión...");
    this.router.navigate(['/dashboard']);
  }
}
