import { Component } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent {
  novaLegenda = {
    color: '#000000',
    description: '',
  };

  legendas = [
    { color: '#FF0000', description: 'Importante' },
    { color: '#00FF00', description: 'Normal' },
    { color: '#0000FF', description: 'Opcional' },
  ];

  adicionarLegenda() {
    if (this.novaLegenda.color && this.novaLegenda.description) {
      this.legendas.push({ ...this.novaLegenda });
      this.novaLegenda = { color: '#000000', description: '' };
    }
  }

  editarLegenda(legenda: any) {
    // Implementar lógica de edição
  }

  deletarLegenda(legenda: any) {
    const index = this.legendas.indexOf(legenda);
    if (index > -1) {
      this.legendas.splice(index, 1);
    }
  }
}
