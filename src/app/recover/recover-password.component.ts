import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecoverService } from './service/recover.service';
import { LoaderService } from '../components/loader/loader.service';
import { NotificationService } from '../components/notification/notification.service';
import { RecoverEmail } from './domain/recover_email';
import { PhoneNumber } from './domain/phone_number';
import { UseSession } from '../util/useSession';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  public recover: RecoverEmail;
  public useSession: UseSession = new UseSession();

  constructor(
    private router: Router,
    private service: RecoverService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.recover = new RecoverEmail();
  }

  recoverPassword(): void {
    if (this.isValidEmail()) {
      this.loaderService.show();
      this.service.sendCode(this.recover).subscribe(
        (res) => {
          this.useSession.setData(res);
          this.router.navigate(['/recover-password/code']);
          this.loaderService.hide();
          this.notificationService.showSuccess('Código enviado com sucesso!');
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'E-mail inválido por favor tente novamente.'
          );
        }
      );
    }
  }

  isValidEmail(): boolean {
    if (this.recover.email != null) {
      return true;
    }
    this.notificationService.showError(
      'E-mail inválido por favor tente novamente.'
    );
    return false;
  }
}