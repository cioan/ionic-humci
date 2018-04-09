import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPatientProvider } from '../../providers/searchpatient/searchpatient';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPatientPage');
  }

}
