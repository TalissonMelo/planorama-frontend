import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword: boolean = false;
  typeButtom: string = 'password';

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.showPassword == true
      ? (this.typeButtom = 'text')
      : (this.typeButtom = 'password');
  }

  login() {
    this.router.navigate(['home']);
    /*this.notificationService.showSuccess('Operação realizada com sucesso!');
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    }, 3000);*/
  }

  register() {
    this.router.navigate(['register']);
    //this.notificationService.showError('Ocorreu um erro durante a operação.');
  }
}
