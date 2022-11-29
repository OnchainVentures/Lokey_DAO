import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GovernancePageRoutingModule } from './governance-routing.module';

import { GovernancePage } from './governance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GovernancePageRoutingModule
  ],
  declarations: [GovernancePage]
})
export class GovernancePageModule {}
