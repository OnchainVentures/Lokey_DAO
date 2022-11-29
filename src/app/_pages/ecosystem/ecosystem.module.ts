import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EcosystemPageRoutingModule } from './ecosystem-routing.module';

import { EcosystemPage } from './ecosystem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EcosystemPageRoutingModule
  ],
  declarations: [EcosystemPage]
})
export class EcosystemPageModule {}
