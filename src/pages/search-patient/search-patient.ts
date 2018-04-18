import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPatientProvider } from '../../providers/searchpatient/searchpatient';
import {PatientPage} from "../patient/patient";
import {AutoCompleteComponent} from "ionic2-auto-complete-ng5";


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public searchPatientProvider: SearchPatientProvider) {
  }

  @ViewChild('searchbar')
  searchbar: AutoCompleteComponent;

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPatientPage');
    this.searchbar.setFocus();
  }

  showPatient(event) {
    if (event) {
      this.navCtrl.push(PatientPage, {uuid: event.uuid});
    }
  }

}
