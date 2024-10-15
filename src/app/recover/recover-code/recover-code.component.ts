import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { UseSession } from 'src/app/util/useSession';
import label from 'src/assets/i18n/label';
import { CodeRequest } from '../domain/code_request';
import { CodeResponse } from '../domain/code_response';

@Component({
  selector: 'app-recover-code',
  templateUrl: './recover-code.component.html',
})
export class RecoverCodeComponent {
  public label = label;
  public email: string;
  public codeRequest: CodeRequest = new CodeRequest();
  public useSession: UseSession = new UseSession();

  @ViewChild('codeInputs') codeInputs!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    public translate: TranslateService
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
    this.loaderService.show();
    if (this.codeRequest.code.length === 6) {
      this.useSession.setCode(
        new CodeResponse(this.codeRequest.code, this.email)
      );
      this.router.navigate(['/recover-password/password']);
    } else {
      this.notificationService.showError('Invalid code, please try again.');
    }
    this.loaderService.hide();
  }

  createCode(): void {
    this.codeRequest.code = Array.from(
      this.codeInputs.nativeElement.querySelectorAll('.code-input')
    )
      .map((input: any) => input.value)
      .join('');
  }
}
