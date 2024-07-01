import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user!: any;

  onSubmit() {
    console.log('Formulário enviado com sucesso!');
    console.log('Dados do usuário:', this.user);
  }
}
