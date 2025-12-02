import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-mis-reservas',
  imports: [],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas {
  reservas: any[] = [];

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getMisReservas().subscribe(data => {
      this.reservas = data;
    });
  }

}
