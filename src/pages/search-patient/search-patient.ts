import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPatientProvider } from '../../providers/searchpatient/searchpatient';
import {AutoCompleteComponent} from "ionic2-auto-complete-ng5";

import { PatientDetailPage } from '../patient-detail/patient-detail';

/**
 * Generated class for the SearchPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-patient',
  templateUrl: 'search-patient.html',
})

export class SearchPatientPage {

  @ViewChild('searchbar') searchbar: AutoCompleteComponent;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public searchPatientProvider: SearchPatientProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPatientPage');
    this.searchbar.setFocus();
  }

  selectPatient(patient){
    console.log("patient = " + patient.uuid);
    this.navCtrl.push(PatientDetailPage, {
      data: patient.uuid
    });
  }
}
