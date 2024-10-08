import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { UseSession } from 'src/app/util/useSession';
import { ChangePassword } from '../domain/change_password';
import { CodeResponse } from '../domain/code_response';
import { ChangePasswordService } from '../service/change_password.service';
import label from 'src/assets/i18n/label';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recover-change-password',
  templateUrl: './recover-change-password.component.html',
})
export class RecoverChangePasswordComponent {
  public label = label;
  public passwordConfirm: string = '';
  public changePassword: ChangePassword;
  public useSession: UseSession = new UseSession();

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private service: ChangePasswordService,
    private notificationService: NotificationService,
    public translate: TranslateService
  ) {
    const code: CodeResponse = this.useSession.getCode();
    //this.changePassword = new ChangePassword(code.newCode, code.email, '');

    this.changePassword = new ChangePassword('', '', '');
  }

  validPassword(): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    const isPasswordValid = passwordRegex.test(this.changePassword.newPassword);

    if (
      isPasswordValid &&
      this.changePassword.newPassword == this.passwordConfirm
    ) {
      return isPasswordValid;
    }

    this.notificationService.showError(
      'Senhas não conferem. Por favor, tente novamente.'
    );
    return false;
  }

  resetPassword() {
    if (this.validPassword()) {
      this.router.navigate(['/login']);
      this.notificationService.showSuccess('Senha alterada com sucesso!');
      // this.loaderService.show();
      // this.service.changePassword(this.changePassword).subscribe(
      //   (res) => {
      //     this.loaderService.hide();
      //     this.router.navigate(['/login']);
      //     this.notificationService.showSuccess('Senha alterada com sucesso!');
      //   },
      //   (error) => {
      //     this.loaderService.hide();
      //     this.notificationService.showError(
      //       'Senhas inválidas por favor tente novamente.'
      //     );
      //   }
      // );
    }
  }
}
