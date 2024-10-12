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
  selectedCountryCode: string = '+55'; // Código de país padrão (Brasil)

  constructor(public translate: TranslateService) {}

  countryCodes: Array<{ name: string; code: string }> = [
    { name: 'Brazil', code: '+55' },
    { name: 'United States', code: '+1' },
  ];

  @Input() id: string = '';
  @Input() placeholder: string = '';

  @Input() changePhone: string = '';
  @Output() phoneChange = new EventEmitter<string>();

  formattedNumber: string = '';

  onPhoneChange(event: any) {
    const fullPhoneNumber = this.selectedCountryCode + ' ' + event;
    console.log(fullPhoneNumber);
  }

  onCountryCodeChange(event: any) {
    this.selectedCountryCode = event;
  }
}
