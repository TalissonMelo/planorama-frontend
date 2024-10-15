import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import label from 'src/assets/i18n/label';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../components/loader/loader.service';
import { NotificationService } from '../components/notification/notification.service';
import { UseSession } from '../util/useSession';
import { RecoverEmail } from './domain/recover_email';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
})
export class RecoverPasswordComponent {
  label = label;
  public recover: RecoverEmail;
  public useSession: UseSession = new UseSession();

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    public translate: TranslateService
  ) {
    this.recover = new RecoverEmail();
  }

  recoverPassword(): void {
    if (this.isValidEmail()) {
      this.loaderService.show();
      const poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId,
      };

      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: this.recover.email,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          this.router.navigate([
            `/recover-password/code/${this.recover.email}`,
          ]);
          this.loaderService.hide();
        },
        onFailure: (err) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Error requesting password recovery.'
          );
        },
      });
    }
  }

  isValidEmail(): boolean {
    if (this.recover.email != null) {
      return true;
    }
    this.notificationService.showError('Invalid email please try again.');
    return false;
  }
}
