import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EcosystemPage } from './ecosystem.page';

const routes: Routes = [
  {
    path: '',
    component: EcosystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcosystemPageRoutingModule {}
