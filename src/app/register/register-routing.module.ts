import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ValidCodeComponent } from './valid-code/valid-code.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'valid-code/:email', component: ValidCodeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
