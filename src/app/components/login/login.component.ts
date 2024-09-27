import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseMessagingService } from 'src/app/services/firebase-messaging.service';
import { UseSession } from 'src/app/util/useSession';
import { LoaderService } from '../loader/loader.service';
import { NotificationService } from '../notification/notification.service';
import { Login } from './user/model/login';
import { UserService } from './user/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public useSession: UseSession = new UseSession();
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
    if (this.login.email == '' || this.login.password == '') {
      this.notificationService.showError('Preencha email e senha!');
      return false;
    }
    return true;
  }
}
