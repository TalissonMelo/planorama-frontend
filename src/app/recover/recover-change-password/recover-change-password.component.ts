import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { UseSession } from 'src/app/util/useSession';
import label from 'src/assets/i18n/label';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../domain/change_password';
import { CodeResponse } from '../domain/code_response';

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
    private notificationService: NotificationService,
    public translate: TranslateService
  ) {
    const code: CodeResponse = this.useSession.getCode();
    this.changePassword = new ChangePassword(code.code, code.email, '');
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
      'Passwords do not match. Please try again.'
    );
    return false;
  }

  resetPassword() {
    if (this.validPassword()) {
      this.loaderService.show();
      const poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId,
      };

      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: this.changePassword.email,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmPassword(
        this.changePassword.code,
        this.changePassword.newPassword,
        {
          onSuccess: () => {
            this.notificationService.showSuccess(
              'Your password has been reset successfully!'
            );
            this.loaderService.hide();
            this.router.navigate(['/login']);
          },
          onFailure: (err) => {
            this.loaderService.hide();
            this.notificationService.showError('Error resetting password.');
          },
        }
      );
    }
  }
}
