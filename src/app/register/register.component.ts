import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRequest } from './model/user_request';
import { NotificationService } from '../components/notification/notification.service';
import { UserService } from './service/user.service';
import { LoaderService } from '../components/loader/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public user: UserRequest;
  public passwordConfirm: string = '';
  public typeButtom: string = 'password';
  public showPassword: boolean = false;
  public typeConfirmButtom: string = 'password';
  public showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private service: UserService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.user = new UserRequest('', '', '', '');
  }

  onSubmit(): void {
    if (this.isValid()) {
      this.loaderService.show();
      this.service.userCreate(this.user).subscribe(
        (res) => {
          this.loaderService.hide();
          this.user = new UserRequest('', '', '', '');
          this.passwordConfirm = '';
          this.notificationService.showSuccess(
            'Usuário registrado com sucesso!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Dados de usuário, inválidos por favor tente novamente.'
          );
        }
      );
    }
  }

  isValid(): boolean {
    if (
      this.user.email != '' &&
      this.user.nickname != '' &&
      this.user.phone != '' &&
      this.user.phone.length == 11 &&
      this.validPassword()
    ) {
      return true;
    }
    return false;
  }

  validPassword(): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    const isPasswordValid = passwordRegex.test(this.user.password);

    if (isPasswordValid && this.user.password == this.passwordConfirm) {
      return isPasswordValid;
    }

    this.notificationService.showError(
      'Senhas não conferem. Por favor, tente novamente.'
    );
    return false;
  }

  toGoBack(): void {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.showPassword == true
      ? (this.typeButtom = 'text')
      : (this.typeButtom = 'password');
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.showConfirmPassword == true
      ? (this.typeConfirmButtom = 'text')
      : (this.typeConfirmButtom = 'password');
  }
}
