import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UseSession } from 'src/app/util/useSession';
import { LoaderService } from '../loader/loader.service';
import { NotificationService } from '../notification/notification.service';
import { Login } from './user/model/login';
import { UserService } from './user/service/user.service';
import { TermsComponent } from '../terms/terms.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseMessagingService } from 'src/app/services/firebase-messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public useSession: UseSession = new UseSession();
  public acceptedTerms: boolean = false;
  public login: Login;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: UserService,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    private firebaseMessagingService: FirebaseMessagingService
  ) {
    this.login = new Login('', '');
  }

  enter(): void {
    if (this.isValid()) {
      this.loaderService.show();
      this.service.logar(this.login).subscribe(
        (res) => {
          this.useSession.setToken(res.authorization);
          this.useSession.setUser(res);
          this.loaderService.hide();
          this.firebaseMessagingService.initFirebase();
          this.router.navigate(['/']);
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'E-mail ou senha, inválidos por favor tente novamente.'
          );
        }
      );
    }
  }

  isValid(): boolean {
    if (!this.acceptedTerms) {
      this.notificationService.showError(
        'Para Utilizar o sistema e necessário aceitar os termos de uso!.'
      );
      return false;
    }

    if (this.login.email == '' || this.login.password == '') {
      this.notificationService.showError('Preencha email e senha!');
      return false;
    }
    return true;
  }

  register(): void {
    this.router.navigate(['register']);
  }

  openTermsModal(): void {
    this.dialog.open(TermsComponent, {
      width: '600px',
    });
  }
}
