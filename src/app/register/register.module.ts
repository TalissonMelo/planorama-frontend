import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from '../components/password/password.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { PhoneModule } from '../components/phone/phone.module';
import { TermsModule } from '../components/terms/terms.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { ValidCodeComponent } from './valid-code/valid-code.component';

@NgModule({
  declarations: [RegisterComponent, ValidCodeComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    PasswordModule,
    PhoneModule,
    TermsModule,
    TranslateModule,
  ],
})
export class RegisterModule {}
