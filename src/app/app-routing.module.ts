import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleNameComponent } from './schedule/schedule-name/schedule-name.component';
import { MembersComponent } from './schedule/members/members.component';
import { GuardRotasGuard } from './guard-rotas.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: NavComponent,
    canActivate: [GuardRotasGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'schedule',
        component: ScheduleNameComponent,
        canActivate: [GuardRotasGuard],
        data: { title: 'Agenda' },
      },
      {
        path: 'session',
        component: ScheduleComponent,
        canActivate: [GuardRotasGuard],
        data: { title: 'Sessões' },
      },
      {
        path: 'members',
        component: MembersComponent,
        canActivate: [GuardRotasGuard],
        data: { title: 'Participantes' },
      },
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
