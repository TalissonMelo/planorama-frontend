import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { CodeRequest } from 'src/app/recover/domain/code_request';
import label from 'src/assets/i18n/label';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-valid-code',
  templateUrl: './valid-code.component.html',
})
export class ValidCodeComponent {
  public label = label;
  public email: string;
  public codeRequest: CodeRequest = new CodeRequest();

  @ViewChild('codeInputs') codeInputs!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.email = this.route.snapshot.paramMap.get('email') || '';
  }

  onInputChange(event: any, index: number) {
    const input = event.target;
    const value = input.value.toUpperCase();

    if (/^[A-Z0-9]$/.test(value)) {
      input.value = value;
      if (index < 5) {
        const nextInput =
          this.codeInputs.nativeElement.querySelectorAll('.code-input')[
            index + 1
          ];
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else {
      input.value = '';
    }
  }

  confirmCode() {
    this.createCode();
    if (this.codeRequest.code.length === 6) {
      const poolData = {
        UserPoolId: environment.userPoolId,
        ClientId: environment.clientId,
      };

      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: this.email,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(
        this.codeRequest.code,
        true,
        (err, result) => {
          if (err) {
            this.notificationService.showError(
              'Error confirming code: ' + err.message
            );
            return;
          }
          this.notificationService.showSuccess('User verified successfully!');
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.notificationService.showError('Invalid code, please try again.');
    }
  }

  createCode(): void {
    this.codeRequest.code = Array.from(
      this.codeInputs.nativeElement.querySelectorAll('.code-input')
    )
      .map((input: any) => input.value)
      .join('');
  }

  resendCode() {
    const poolData = {
      UserPoolId: environment.userPoolId,
      ClientId: environment.clientId,
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: this.email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        this.notificationService.showError(
          'Error resending code: ' + err.message
        );
        return;
      }
      this.notificationService.showSuccess(
        'Code resent successfully! Please check your email.'
      );
    });
  }
}
