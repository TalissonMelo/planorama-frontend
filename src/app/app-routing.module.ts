import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: NavComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'schedule', component: ScheduleComponent },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'recover-password',
    loadChildren: () =>
      import('./recover/recover-password.module').then(
        (r) => r.RecoverPasswordModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
