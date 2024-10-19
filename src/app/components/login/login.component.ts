import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { UseSession } from 'src/app/util/useSession';
import label from 'src/assets/i18n/label';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../loader/loader.service';
import { NotificationService } from '../notification/notification.service';
import { Login } from './user/model/login';
import { UserLogin } from './user/model/user_login';
import { SettingsService } from 'src/app/configure/service/configure.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public useSession: UseSession = new UseSession();
  public login: Login;
  label = label;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    private loaderService: LoaderService,
    private settingService: SettingsService,
    private notificationService: NotificationService
  ) {
    this.login = new Login('', '');
  }

  enter(): void {
    if (this.isValid()) {
      this.loaderService.show();

      var poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId,
      };
      var userPool = new CognitoUserPool(poolData);

      var authData = {
        Username: this.login.email,
        Password: this.login.password,
      };
      var authDetails = new AuthenticationDetails(authData);

      var userData = {
        Username: this.login.email,
        Pool: userPool,
      };
      var cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const payload = result.getIdToken().decodePayload();
          const email = payload['email'];
          const username = payload['cognito:username'];
          const name = payload['name'];

          this.useSession.setUser(
            new UserLogin(
              username,
              email,
              name,
              result.getIdToken().getJwtToken(),
              result.getRefreshToken().getToken()
            )
          );
          this.useSession.setToken(result.getIdToken().getJwtToken());
          this.settingService.list().subscribe((res) => {
            if (res != null) {
              this.useSession.setSettings(res);
              this.router.navigate(['/']);
              this.loaderService.hide();
            } else {
              this.router.navigate(['/configure']);
              this.loaderService.hide();
            }
          });
        },
        onFailure: (err) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Invalid email or password. Please try again.'
          );
        },
      });
    }
  }

  isValid(): boolean {
    if (this.login.email == '' || this.login.password == '') {
      this.notificationService.showError('Fill in email and password!');
      return false;
    }
    return true;
  }
}
