import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneComponent } from './phone.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PhoneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [PhoneComponent],
  providers: [provideNgxMask()],
})
export class PhoneModule {}
