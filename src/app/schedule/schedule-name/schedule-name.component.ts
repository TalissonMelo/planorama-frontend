import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-name',
  templateUrl: './schedule-name.component.html',
  styleUrls: ['./schedule-name.component.css'],
})
export class ScheduleNameComponent {
  horarios = [
    { nome: 'Turma 3º III', horarioInicial: '08:00', horarioFinal: '17:00' },
    { nome: 'Turma 1º I', horarioInicial: '09:00', horarioFinal: '18:00' },
  ];

  constructor(private router: Router) {}

  adicionarHorario() {}

  visualizarHorario(horario: any) {
    this.router.navigate(['session']);
    console.log('Visualizar:', horario);
  }

  editarHorario(horario: any) {
    console.log('Editar:', horario);
  }

  deletarHorario(horario: any) {
    console.log('Deletar:', horario);
    const index = this.horarios.indexOf(horario);
    if (index !== -1) {
      this.horarios.splice(index, 1);
    }
  }

  verParticipantes() {
    this.router.navigate(['/members']);
  }
}
