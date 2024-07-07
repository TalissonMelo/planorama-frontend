import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordComponent } from './recover-password.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RecoverCodeComponent } from './recover-code/recover-code.component';
import { RecoverChangePasswordComponent } from './recover-change-password/recover-change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from '../components/password/password.module';

@NgModule({
  declarations: [
    RecoverPasswordComponent,
    RecoverCodeComponent,
    RecoverChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
  ],
})
export class RecoverPasswordModule {}
