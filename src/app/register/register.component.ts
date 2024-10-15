import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import label from 'src/assets/i18n/label';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../components/loader/loader.service';
import { NotificationService } from '../components/notification/notification.service';
import { TermsComponent } from '../components/terms/terms.component';
import { Iuser } from './model/iuser';
import { UserRequest } from './model/user_request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public label = label;
  public user: UserRequest;
  public acceptedTerms: boolean = false;
  public passwordConfirm: string = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.user = new UserRequest('', '', '');
  }

  onSubmit(): void {
    if (this.isValid()) {
      this.loaderService.show();
      var poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId,
      };

      var userPool = new CognitoUserPool(poolData);

      var attributeList = [];

      var iuser: Iuser = {
        email: this.user.email,
        name: this.user.nickname,
      };

      for (let key in iuser) {
        var attrData = {
          Name: key,
          Value: iuser[key],
        };
        var attr = new CognitoUserAttribute(attrData);
        attributeList.push(attr);
      }

      userPool.signUp(
        this.user.email,
        this.user.password,
        attributeList,
        [],
        (err, result) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            this.loaderService.hide();
            return;
          }
          this.router.navigate([`/register/valid-code/${this.user.email}`]);
          this.notificationService.showSuccess('User registered successfully!');
          this.loaderService.hide();
        }
      );
    }
  }

  isValid(): boolean {
    if (!this.acceptedTerms) {
      this.notificationService.showError(
        'To use the system you must accept the terms of use!.'
      );
      return false;
    }

    if (
      this.user.email != '' &&
      this.user.nickname != '' &&
      this.validPassword()
    ) {
      return true;
    }
    this.notificationService.showError('Invalid user data, please try again.');
    return false;
  }

  validPassword(): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    const isPasswordValid = passwordRegex.test(this.user.password);

    if (isPasswordValid && this.user.password == this.passwordConfirm) {
      return isPasswordValid;
    }

    this.notificationService.showError(
      'Passwords do not match. Please try again.'
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
