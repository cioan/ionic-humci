import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {VitalsProvider} from "../../providers/vitals/vitals";
import {BP} from "../../models/bp";

/**
 * Generated class for the BpModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bp-modal',
  templateUrl: 'bp-modal.html',
})
export class BpModalPage {
  patientUuid: string;
  locationUuid: string;
  providerUuid: string;
  systolic: number;
  diastolic: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public vitals: VitalsProvider) {
    this.patientUuid = navParams.get('patientUuid');
    this.locationUuid = '0d414ce2-5ab4-11e0-870c-9f6107fee88e'; //TODO: remove, hardcoded for neno

    //this.locationUuid = navParams.get('locationUuid');
    //this.providerUuid = navParams.get('providerUuid');
    // localStorage.setItem('userData', JSON.stringify(this.resposeData) )

    let userData = JSON.parse(localStorage.getItem('userData'));
    userData.user.roles.map((role) => {
      if (role.display == "Provider") {
        this.providerUuid = role.uuid;
        return;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BpModalPage');
  }

  // required: systolic, diastolic, dateRecorded, location, provider, encounterType
  // creates a new encounter
  saveBP() {
    let bp = new BP();
    bp.systolic = this.systolic;
    bp.diastolic = this.diastolic;
    bp.dateRecorded = new Date();
    this.vitals.saveBP(this.patientUuid, bp, this.locationUuid, this.providerUuid).then((result) => {
      bp.omrsUuid = result['omrsUuid'];
      this.viewCtrl.dismiss(bp);
    });
  }

  setSystolic(systolic) {
    this.systolic = systolic;
  }

  setDiastolic(diastolic) {
    this.diastolic = diastolic;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
