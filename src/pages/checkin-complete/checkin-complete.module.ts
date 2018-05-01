import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinCompletePage } from './checkin-complete';

@NgModule({
  declarations: [
    CheckinCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinCompletePage),
  ],
})
export class ConfirmCheckinPageModule {}
