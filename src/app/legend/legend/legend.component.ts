import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { LegendRequest } from '../domain/legend_request';
import { LegendResponse } from '../domain/legend_response';
import { LegendService } from '../service/legend.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import label from 'src/assets/i18n/label';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnInit {
  public label = label;
  @ViewChild('legendDialog') legendDialog!: TemplateRef<any>;
  public legends: LegendResponse[] = [];
  public legend: LegendRequest;
  public isEditing: boolean = false;
  public legendEditId: string = '';
  public colors: { name: string; hex: string }[] = [
    { name: 'Verde', hex: '#90EE90' },
    { name: 'Azul', hex: '#ADD8E6' },
    { name: 'Laranja', hex: '#FFD700' },
    { name: 'Lilas', hex: '#E6E6FA' },
    { name: 'Rosa', hex: '#FFB6C1' },
    { name: 'Ciano', hex: '#00FFFF' },
    { name: 'Vermelho', hex: '#FF6347' },
    { name: 'Amarelo', hex: '#FFFFE0' },
    { name: 'Roxo', hex: '#DA70D6' },
    { name: 'Verde água', hex: '#20B2AA' },
    { name: 'Tomato', hex: '#FF6347' },
    { name: 'Peach Puff', hex: '#FFDAB9' },
  ];

  selectedLegend = null;
  legendForm: FormGroup;

  constructor(
    private service: LegendService,
    private loaderService: LoaderService,
    public translate: TranslateService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.legend = new LegendRequest();
    this.legend.color = '#000';
    this.legendForm = this.fb.group({
      description: [''],
      color: [''],
    });
  }

  ngOnInit(): void {
    // this.loaderService.show();
    // this.service.legends().subscribe(
    //   (res) => {
    //     this.legends = res;
    //     this.loaderService.hide();
    //   },
    //   (error) => {
    //     this.loaderService.hide();
    //   }
    // );
    this.legends = [
      {
        id: '1',
        color: '#90EE90',
        ownerId: 'owner123',
        description: 'A legend item for the first chart',
      },
      {
        id: '2',
        color: '#ADD8E6',
        ownerId: 'owner456',
        description: 'A legend second chart',
      },
      {
        id: '3',
        color: '#3357FF',
        ownerId: 'owner789',
        description: 'A legend  third chart',
      },
      {
        id: '3',
        color: '#FFD700',
        ownerId: 'owner789',
        description: 'A legend  third chart',
      },
      {
        id: '3',
        color: '#DA70D6',
        ownerId: 'owner789',
        description: 'A legend  third chart',
      },
      {
        id: '3',
        color: '#E6E6FA',
        ownerId: 'owner789',
        description: 'A legend  third chart',
      },
    ];
  }

  saveLegend() {
    if (this.isValidLegend()) {
      this.loaderService.show();
      this.service.save(this.legend).subscribe(
        (res) => {
          this.loaderService.hide();
          this.legends.unshift(res);
          this.legend = new LegendRequest();
          this.notificationService.showSuccess(
            'Legenda cadastrada com sucesso!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Legenda inválido por favor tente novamente.'
          );
        }
      );
    }
  }

  save(legend: LegendResponse) {
    let updateLegend: LegendRequest = new LegendRequest();
    updateLegend.color = legend.color;
    updateLegend.description = legend.description;
    this.loaderService.show();
    this.service.update(legend.id, updateLegend).subscribe(
      (res) => {
        legend = res;
        this.isEditing = false;
        this.legendEditId = '';
        this.loaderService.hide();
        this.notificationService.showSuccess('Legenda atualizada com sucesso!');
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Legenda inválido por favor tente novamente.'
        );
      }
    );
  }

  isValidLegend(): boolean {
    if (this.legend.color != null && this.legend.description != null) {
      return true;
    }
    this.notificationService.showError(
      'Legenda inválido por favor tente novamente.'
    );
    return false;
  }

  deleted(legend: LegendResponse) {
    if (confirm('Deseja deletar a agenda: ' + legend.description)) {
      this.loaderService.show();
      this.service.delete(legend.id).subscribe(
        (res) => {
          const index = this.legends.indexOf(legend);
          this.legends.splice(index, 1);
          this.loaderService.hide();
          this.notificationService.showSuccess('Legenda deletada com sucesso!');
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Legenda não deletada por favor tente novamente.'
          );
        }
      );
    }
  }

  openLegendDialog(legend = null): void {
    this.legendForm.reset();
    this.dialog.open(this.legendDialog);
  }

  clearColor(color: string, amount: number = 30): string {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, r + amount);
    g = Math.min(255, g + amount);
    b = Math.min(255, b + amount);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .padStart(6, '0')}`;
  }
}
