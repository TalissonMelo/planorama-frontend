import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword: boolean = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.router.navigate(['home']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
