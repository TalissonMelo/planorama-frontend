import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { GuardRotasGuard } from '../guard-rotas.guard';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [GuardRotasGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
