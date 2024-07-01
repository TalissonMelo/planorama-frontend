import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user = {
    email: '',
    nickname: '',
    telefone: '',
  };

  passwords = {
    currentPassword: '',
    newPassword: '',
  };

  onSubmit() {
    console.log('Perfil atualizado:', this.user);
  }

  onChangePassword() {
    if (this.passwords.currentPassword && this.passwords.newPassword) {
      console.log('Senha atual:', this.passwords.currentPassword);
      console.log('Nova senha:', this.passwords.newPassword);
    }
  }
}
