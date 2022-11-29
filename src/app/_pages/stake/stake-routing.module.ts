import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StakePage } from './stake.page';

const routes: Routes = [
  {
    path: '',
    component: StakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StakePageRoutingModule {}
