import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showPassword: boolean = false;
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  carouselImages: string[] = [
    'assets/img/home-image.svg',
    'assets/img/login-image.svg',
    'assets/img/side-image.svg',
  ];
  

  constructor(private router: Router){

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  

  login(){
      this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register']);
  }


  scrollLeft() {
    this.carousel.nativeElement.scrollLeft -= 300; 
  }

  scrollRight() {
    this.carousel.nativeElement.scrollLeft += 300; 
  }
}
