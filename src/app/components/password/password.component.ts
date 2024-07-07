import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent {
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
