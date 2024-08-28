import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from '../components/password/password.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { PhoneModule } from '../components/phone/phone.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    PhoneModule,
  ],
})
export class RegisterModule {}
