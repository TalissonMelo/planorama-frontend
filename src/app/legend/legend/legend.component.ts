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
    this.legendForm = this.fb.group({
      description: [''],
      color: [''],
    });
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.service.legends().subscribe(
      (res) => {
        this.legends = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  saveLegend() {
    if (this.isValidLegend()) {
      this.loaderService.show();
      this.service.save(this.legend).subscribe(
        (res) => {
          this.legends.push(res);
          this.legend = new LegendRequest();
          this.loaderService.hide();
          this.notificationService.showSuccess(
            'Caption registered successfully!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Invalid caption please try again.'
          );
        }
      );
    }
  }

  isValidLegend(): boolean {
    if (this.legend.color != null && this.legend.description != null) {
      return true;
    }
    this.notificationService.showError('Invalid caption please try again.');
    return false;
  }

  deleted(legend: LegendResponse) {
    if (confirm('Do you want to delete the calendar: ' + legend.description)) {
      this.loaderService.show();
      this.service.delete(legend.id).subscribe(
        (res) => {
          const index = this.legends.indexOf(legend);
          this.legends.splice(index, 1);
          this.loaderService.hide();
          this.notificationService.showSuccess(
            'Subtitle deleted successfully!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Subtitle not deleted please try again.'
          );
        }
      );
    }
  }

  openLegendDialog(): void {
    this.legendForm.reset();
    this.dialog.open(this.legendDialog);
  }
}
