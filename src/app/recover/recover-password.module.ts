import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordComponent } from './recover-password.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { PasswordModule } from '../components/password/password.module';
import { RecoverChangePasswordComponent } from './recover-change-password/recover-change-password.component';
import { RecoverCodeComponent } from './recover-code/recover-code.component';

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
    TranslateModule,
  ],
})
export class RecoverPasswordModule {}
