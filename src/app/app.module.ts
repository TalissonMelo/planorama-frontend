import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Para realizar requisições HTTP
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

//Components
import { registerLocaleData } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { ScheduleComponent } from './schedule/schedule.component';

import localePt from '@angular/common/locales/pt';
import { LoaderComponent } from './components/loader/loader/loader.component';
import { PasswordModule } from './components/password/password.module';
import { MembersComponent } from './schedule/members/members.component';
import { ScheduleNameComponent } from './schedule/schedule-name/schedule-name.component';
import { TokenInterceptor } from './token.interceptor';
import { UseSession } from './util/useSession';
import { PhoneModule } from './components/phone/phone.module';
import { TermsModule } from './components/terms/terms.module';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    //CREATE MODULES
    PasswordModule,
    PhoneModule,
    TermsModule,

    //HTTP
    HttpClientModule,

    // FORMS
    FormsModule,
    ReactiveFormsModule,

    //Material
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

    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,

    //Calendar
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
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
