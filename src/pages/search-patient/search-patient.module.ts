import { NgModule } from '@angular/core';
import {IonicPageModule, NavController, NavParams} from 'ionic-angular';
import { SearchPatientPage } from './search-patient';

@NgModule({
  declarations: [
    SearchPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPatientPage),
  ],
})
export class SearchPatientPageModule {}
