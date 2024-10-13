import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LegendResponse } from '../../legend/domain/legend_response';
import { SessionRequest } from '../modal/domain/session_request';
import label from 'src/assets/i18n/label';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-session-modal',
  templateUrl: './add-session-modal.component.html',
  styleUrls: ['./add-session-modal.component.css']
})
export class AddSessionModalComponent {
  dropdownOpen = false;
  public label = label;
  public sessionRequest: SessionRequest = new SessionRequest();

  session = {
    title: '',
    startTime: '',
    endTime: ''
  };

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<AddSessionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onSubmit(): void {
    this.dialogRef.close(this.session);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  legends: LegendResponse[] = [
    {
      id: 'legend1',
      color: '#FF5733',
      ownerId: 'owner123',
      description:
        'Geografia descrição e explicação de relevo e dados. Geografia descrição e explicação de relevo e dados',
    },
    {
      id: 'legend2',
      color: '#33FF57',
      ownerId: 'owner456',
      description: 'Team ups',
    },
    {
      id: 'legend3',
      color: '#3357FF',
      ownerId: 'owner789',
      description: 'Project',
    },
    {
      id: 'legend4',
      color: '#FFD700',
      ownerId: 'owner1011',
      description: 'Personal time',
    },
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLegend(legend: any) {
    this.sessionRequest.legendId = legend.id;
    this.dropdownOpen = true;
  }

  getSelectedLegendDescription() {
    const selected = this.legends.find(
      (legend) => legend.id === this.sessionRequest.legendId
    );
    return selected ? selected.description : this.translate.getDefaultLang() === "en" ? "Select a legend" : "Selecione uma legenda";
  }

  getSelectedLegendColor() {
    const selected = this.legends.find(
      (legend) => legend.id === this.sessionRequest.legendId
    );
    return selected ? selected.color : 'transparent';
  }
}
