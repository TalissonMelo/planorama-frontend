import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureComponent } from './configure/configure.component';

import { MatIconModule } from '@angular/material/icon';
import { ConfigureRoutingModule } from './configure-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConfigureComponent],
  imports: [
    CommonModule,
    FormsModule,
    ConfigureRoutingModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class ConfigureModule {}
