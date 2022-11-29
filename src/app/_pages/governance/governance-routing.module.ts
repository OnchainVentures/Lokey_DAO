import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GovernancePage } from './governance.page';

const routes: Routes = [
  {
    path: '',
    component: GovernancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GovernancePageRoutingModule {}
