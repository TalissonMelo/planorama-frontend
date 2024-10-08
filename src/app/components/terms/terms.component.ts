import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import label from 'src/assets/i18n/label';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent {
  public label = label;
  constructor(public translate: TranslateService) {}
}
