import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { LegendRequest } from '../domain/legend_request';
import { LegendResponse } from '../domain/legend_response';
import { LegendService } from '../service/legend.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnInit {
  public legends: LegendResponse[] = [];
  public legend: LegendRequest;
  public isEditing: boolean = false;
  public legendEditId: string = '';

  constructor(
    private service: LegendService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.legend = new LegendRequest();
    this.legend.color = '#000';
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.service.getLegends().subscribe(
      (res) => {
        this.legends = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  adicionarLegenda() {
    if (this.isValidLegend()) {
      this.loaderService.show();
      this.service.save(this.legend).subscribe(
        (res) => {
          this.loaderService.hide();
          this.legends.unshift(res);
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

  edit(legend: LegendResponse) {
    this.isEditing = true;
    this.legendEditId = legend.id;
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
}
