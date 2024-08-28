import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css'],
})
export class PhoneComponent {
  @Input() id: string = '';
  @Input() placeholder: string = '';

  @Input() changePhone: string = '';
  @Output() phoneChange = new EventEmitter<string>();

  onPhoneChange(value: string) {
    this.changePhone = value;
    this.phoneChange.emit(this.changePhone);
  }
}
