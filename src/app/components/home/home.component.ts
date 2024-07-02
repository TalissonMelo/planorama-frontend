import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  horariosOcupados = [
    {
      evento: 'Reunião de Equipe',
      horarioInicial: '09:00',
      horarioFinal: '10:00',
    },
    {
      evento: 'Consulta Médica',
      horarioInicial: '14:00',
      horarioFinal: '15:00',
    },
  ];

  horariosVagos = [
    {
      horarioInicial: '10:00',
      horarioFinal: '14:00',
    },
    {
      horarioInicial: '15:00',
      horarioFinal: '17:00',
    },
  ];
}
