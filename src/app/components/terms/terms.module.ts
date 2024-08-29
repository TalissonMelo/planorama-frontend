import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TermsComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [TermsComponent],
})
export class TermsModule {}
