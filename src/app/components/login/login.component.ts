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
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    public translate: TranslateService
  ) {
    this.login = new Login('', '');
  }

  enter(): void {
    if (this.isValid()) {
      this.loaderService.show();

      /*  const poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId,
      };
      const userPool = new CognitoUserPool(poolData);

      const authData = {
        Username: this.login.email,
        Password: this.login.password,
      };
      const authDetails = new AuthenticationDetails(authData);

      const userData = {
        Username: this.login.email,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          console.log(result);
          const idToken = result.getIdToken().getJwtToken();
          const accessToken = result.getAccessToken().getJwtToken();

          this.useSession.setToken(idToken);

          this.loaderService.hide();
          this.notificationService.showSuccess('Login realizado com sucesso!');
          this.router.navigate(['/']);
        },
        onFailure: (err) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'E-mail ou senha inválidos. Por favor, tente novamente.'
          );
        },
      });*/
    }
  }

  isValid(): boolean {
    if (this.login.email == '' || this.login.password == '') {
      this.notificationService.showError('Preencha email e senha!');
      return false;
    }
    return true;
  }
}
