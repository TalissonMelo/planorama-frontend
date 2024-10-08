import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UseSession } from 'src/app/util/useSession';
import { CodeService } from '../service/code.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { CodeRequest } from '../domain/code_request';
import { Email } from '../domain/email';
import { TranslateService } from '@ngx-translate/core';
import label from 'src/assets/i18n/label';

@Component({
  selector: 'app-recover-code',
  templateUrl: './recover-code.component.html',
})
export class RecoverCodeComponent {
  public label = label;
  public email!: Email;
  public codeRequest: CodeRequest = new CodeRequest();
  public useSession: UseSession = new UseSession();

  @ViewChild('codeInputs') codeInputs!: ElementRef;

  constructor(
    private router: Router,
    private service: CodeService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    public translate: TranslateService
  ) {
    this.email = this.useSession.getData();
  }

  onInputChange(event: any, index: number) {
    const input = event.target;
    const value = input.value.toUpperCase();

    if (/^[A-Z0-9]$/.test(value)) {
      input.value = value;
      if (index < 4) {
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
    if (this.codeRequest.code.length === 5) {
      this.router.navigate(['/recover-password/password']);
      //   this.loaderService.show();
      //   this.service.sendCode(this.codeRequest).subscribe(
      //     (res) => {
      //       this.useSession.setCode(res);
      //       this.router.navigate(['/recover-password/password']);
      //       this.loaderService.hide();
      //     },
      //     (error) => {
      //       this.loaderService.hide();
      //       this.notificationService.showError(
      //         'Código inválido, por favor tente novamente.'
      //       );
      //     }
      //   );
      // } else {
      //   this.notificationService.showError(
      //     'Por favor, preencha todos os campos.'
      //   );
    } else {
      this.notificationService.showError(
        'Código inválido, por favor tente novamente.'
      );
    }
  }

  createCode(): void {
    this.codeRequest.code = Array.from(
      this.codeInputs.nativeElement.querySelectorAll('.code-input')
    )
      .map((input: any) => input.value)
      .join('');
  }
}
