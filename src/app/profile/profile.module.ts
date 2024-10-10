import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PasswordModule } from '../components/password/password.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UseSession } from '../util/useSession';
import { TokenInterceptor } from '../token.interceptor';
import { PhoneModule } from '../components/phone/phone.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    HttpClientModule,
    PhoneModule,
    TranslateModule,
  ],
  providers: [
    UseSession,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class ProfileModule {}
