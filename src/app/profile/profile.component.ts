import { Component } from '@angular/core';
import { LoaderService } from '../components/loader/loader.service';
import { NotificationService } from '../components/notification/notification.service';
import { UseSession } from '../util/useSession';
import { ChangePasswordRequest } from './model/change_password_request';
import { UserUpdateRequest } from './model/user_update_request';
import { ProfileService } from './service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public email: string;
  public passwordConfirm: string = '';
  public userUpdate: UserUpdateRequest;
  public chancePassword: ChangePasswordRequest;
  public useSession: UseSession = new UseSession();

  constructor(
    private router: Router,
    private service: ProfileService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.chancePassword = new ChangePasswordRequest('', '');
    this.email = this.useSession.getUser().email;
    this.userUpdate = new UserUpdateRequest(
      this.useSession.getUser().nickname,
      this.useSession.getUser().phone
    );
  }

  validPassword(): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    const isPasswordValid = passwordRegex.test(this.chancePassword.newPassword);

    if (
      isPasswordValid &&
      this.chancePassword.oldPassword != '' &&
      this.chancePassword.newPassword == this.passwordConfirm
    ) {
      return isPasswordValid;
    }

    this.notificationService.showError(
      'Senhas não conferem. Por favor, tente novamente.'
    );
    return false;
  }

  onSubmit() {
    if (this.isValid()) {
      this.loaderService.show();
      this.service.userUpdate(this.userUpdate).subscribe(
        (res) => {
          this.loaderService.hide();
          this.useSession.clear();
          this.router.navigate(['login']);
          this.notificationService.showSuccess(
            'Dadis alterados com sucesso, faça login novamente!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Dados de senha, inválidos por favor tente novamente.'
          );
        }
      );
    }
  }

  onChangePassword() {
    if (this.validPassword()) {
      this.loaderService.show();
      this.service.changePassword(this.chancePassword).subscribe(
        (res) => {
          this.loaderService.hide();
          this.chancePassword = new ChangePasswordRequest('', '');
          this.passwordConfirm = '';
          this.notificationService.showSuccess('Senha alterada com sucesso!');
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Dados de senha, inválidos por favor tente novamente.'
          );
        }
      );
    }
  }

  isValid(): boolean {
    if (this.userUpdate.nickname != '' && this.userUpdate.phone.length == 11) {
      return true;
    }
    this.notificationService.showError(
      'Dados de usuário, inválidos por favor tente novamente.'
    );
    return false;
  }
}
