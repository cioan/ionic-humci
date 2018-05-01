import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckinPage } from "../checkin/checkin";
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the CheckinCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-checkin',
  templateUrl: 'checkin-complete.html',
})
export class CheckinCompletePage {

  patient: any;
  myDate = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utils:UtilsProvider) {
    this.patient = navParams.get('data');
    console.log("patient = " + this.patient.display);
    this.myDate = this.utils.getCurrentDateTime();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinCompletePage');
  }

  backToCheckinList(){
    this.navCtrl.push(CheckinPage);
  }

}
