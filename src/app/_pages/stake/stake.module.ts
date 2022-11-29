import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StakePageRoutingModule } from './stake-routing.module';

import { StakePage } from './stake.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StakePageRoutingModule
  ],
  declarations: [StakePage]
})
export class StakePageModule {}
