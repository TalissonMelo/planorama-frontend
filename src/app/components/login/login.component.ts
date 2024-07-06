import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UseSession } from 'src/app/util/useSession';
import { LoaderService } from '../loader/loader.service';
import { NotificationService } from '../notification/notification.service';
import { Login } from './user/model/login';
import { UserService } from './user/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public useSession: UseSession = new UseSession();
  public typeButtom: string = 'password';
  public showPassword: boolean = false;
  public login: Login;

  constructor(
    private router: Router,
    private service: UserService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {
    this.login = new Login('', '');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.showPassword == true
      ? (this.typeButtom = 'text')
      : (this.typeButtom = 'password');
  }

  enter(): void {
    this.loaderService.show();
    this.service.logar(this.login).subscribe(
      (res) => {
        this.useSession.setToken(res.authorization);
        this.useSession.setUser(res);
        this.loaderService.hide();
        this.notificationService.showSuccess('Operação realizada com sucesso!');
        this.router.navigate(['home']);
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Ocorreu um erro durante a operação.'
        );
      }
    );
  }

  register() {
    this.router.navigate(['register']);
  }
}
