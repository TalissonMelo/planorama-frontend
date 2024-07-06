import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user!: any;

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Formulário enviado com sucesso!');
    console.log('Dados do usuário:', this.user);
  }

  toGoBack(): void {
    this.router.navigate(['login']);
  }
}
