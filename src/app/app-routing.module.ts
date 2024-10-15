import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { MembersComponent } from './schedule/members/members.component';
import { ScheduleNameComponent } from './schedule/schedule-name/schedule-name.component';
import { ScheduleComponent } from './schedule/schedule.component';
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
      },
      {
        path: 'session',
        component: ScheduleComponent,
        canActivate: [GuardRotasGuard],
      },
      {
        path: 'members',
        component: MembersComponent,
        canActivate: [GuardRotasGuard],
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
      {
        path: 'chat',
        loadChildren: () =>
          import('./chat/chat.module').then((c) => c.ChatModule),
      },
      {
        path: 'configure',
        loadChildren: () =>
          import('./configure/configure.module').then((c) => c.ConfigureModule),
      },
      {
        path: 'video',
        loadChildren: () =>
          import('./video-call/video-call.module').then(
            (v) => v.VideoCallModule
          ),
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
