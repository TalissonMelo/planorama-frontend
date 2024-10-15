import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

import { registerLocaleData } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { ScheduleComponent } from './schedule/schedule.component';

import localePt from '@angular/common/locales/pt';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChatModule } from './chat/chat.module';
import { AddSessionModalComponent } from './components/add-session-modal/add-session-modal.component';
import { LoaderComponent } from './components/loader/loader/loader.component';
import { PasswordModule } from './components/password/password.module';
import { PhoneModule } from './components/phone/phone.module';
import { TermsModule } from './components/terms/terms.module';
import { ToastComponent } from './components/toast/toast.component';
import { MembersComponent } from './schedule/members/members.component';
import { ScheduleNameComponent } from './schedule/schedule-name/schedule-name.component';
import { TokenInterceptor } from './token.interceptor';
import { UseSession } from './util/useSession';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    ModalComponent,
    HeaderComponent,
    ScheduleComponent,
    ScheduleNameComponent,
    MembersComponent,
    LoaderComponent,
    ToastComponent,
    AddSessionModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PasswordModule,
    PhoneModule,
    TermsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    TranslateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    UseSession,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
