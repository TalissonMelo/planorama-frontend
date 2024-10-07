import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureComponent } from './configure/configure.component';

import { MatIconModule } from '@angular/material/icon';
import { ConfigureRoutingModule } from './configure-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ConfigureComponent],
  imports: [
    CommonModule,
    ConfigureRoutingModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class ConfigureModule {}
