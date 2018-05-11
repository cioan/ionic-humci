import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BpModalPage } from './bp-modal';

@NgModule({
  declarations: [
    BpModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BpModalPage),
  ],
})
export class BpModalPageModule {}
