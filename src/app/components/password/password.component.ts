import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import label from 'src/assets/i18n/label';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent {
  constructor(public translate: TranslateService) {}

  public label = label;
  private _changePassword: string = '';

  @Input() id: string = '';
  @Input() title: string = '';
  @Input() placeholder: string = '';

  @Input()
  get changePassword(): string {
    return this._changePassword;
  }
  set changePassword(value: string) {
    this._changePassword = value;
    this.passwordChange.emit(this._changePassword);
  }

  @Output() passwordChange = new EventEmitter<string>();

  typeButton: string = 'password';
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.typeButton = this.showPassword ? 'text' : 'password';
  }
}
