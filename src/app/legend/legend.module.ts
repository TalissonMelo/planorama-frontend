import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegendRoutingModule } from './legend-routing.module';
import { LegendComponent } from './legend/legend.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LegendComponent],
  imports: [
    CommonModule,
    LegendRoutingModule,

    // FORMS
    FormsModule,
    ReactiveFormsModule,

    // Módulos do Angular Material
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    TranslateModule,
  ],
})
export class LegendModule {}
