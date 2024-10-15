import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverCodeComponent } from './recover-code/recover-code.component';
import { RecoverChangePasswordComponent } from './recover-change-password/recover-change-password.component';

const routes: Routes = [
  { path: '', component: RecoverPasswordComponent },
  { path: 'code/:email', component: RecoverCodeComponent },
  { path: 'password', component: RecoverChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverPasswordRoutingModule {}
