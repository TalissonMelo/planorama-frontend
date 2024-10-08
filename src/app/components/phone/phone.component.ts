import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import label from 'src/assets/i18n/label';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css'],
})
export class PhoneComponent {
  public label = label;

  constructor(public translate: TranslateService) {}

  @Input() id: string = '';
  @Input() placeholder: string = '';

  @Input() changePhone: string = '';
  @Output() phoneChange = new EventEmitter<string>();

  onPhoneChange(value: string) {
    this.changePhone = value;
    this.phoneChange.emit(this.changePhone);
  }
}
