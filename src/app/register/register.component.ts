import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRequest } from './model/user_request';
import { NotificationService } from '../components/notification/notification.service';
import { UserService } from './service/user.service';
import { LoaderService } from '../components/loader/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsComponent } from '../components/terms/terms.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public user: UserRequest;
  public acceptedTerms: boolean = false;
  public passwordConfirm: string = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
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
          this.router.navigate(['/login']);
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
    if (!this.acceptedTerms) {
      this.notificationService.showError(
        'Para Utilizar o sistema e necessário aceitar os termos de uso!.'
      );
      return false;
    }

    if (
      this.user.email != '' &&
      this.user.nickname != '' &&
      this.user.phone != '' &&
      this.user.phone.length == 16 &&
      this.validPassword()
    ) {
      return true;
    }
    this.notificationService.showError(
      'Dados de usuário, inválidos por favor tente novamente.'
    );
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

  openTermsModal(): void {
    this.dialog.open(TermsComponent, {
      width: '600px',
    });
  }
}
