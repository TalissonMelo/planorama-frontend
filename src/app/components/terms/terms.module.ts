import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TermsComponent],
  imports: [CommonModule, MatDialogModule, TranslateModule],
  exports: [TermsComponent],
})
export class TermsModule {}
