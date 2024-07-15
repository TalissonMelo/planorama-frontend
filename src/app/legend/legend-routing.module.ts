import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegendComponent } from './legend/legend.component';
import { GuardRotasGuard } from '../guard-rotas.guard';

const routes: Routes = [
  { path: '', component: LegendComponent, canActivate: [GuardRotasGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegendRoutingModule {}
