import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegendRoutingModule } from './legend-routing.module';
import { LegendComponent } from './legend/legend.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LegendComponent],
  imports: [
    CommonModule,
    LegendRoutingModule,
    MatIconModule,
    MatButtonModule,

    // FORMS
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LegendModule {}
