import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './password.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PasswordComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [PasswordComponent],
})
export class PasswordModule {}
