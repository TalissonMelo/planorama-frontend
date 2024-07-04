import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleNameComponent } from './schedule/schedule-name/schedule-name.component';
import { MembersComponent } from './schedule/members/members.component';

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
      { path: 'schedule', component: ScheduleNameComponent },
      { path: 'session', component: ScheduleComponent },
      { path: 'members', component: MembersComponent },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((p) => p.ProfileModule),
      },
      {
        path: 'legend',
        loadChildren: () =>
          import('./legend/legend.module').then((l) => l.LegendModule),
      },
    ],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((r) => r.RegisterModule),
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
