import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';
import { PatientProvider } from '../../providers/patient/patient';
import { UtilsProvider } from '../../providers/utils/utils';
import { OmrsProvider } from "../../providers/omrs/omrs";
import { CheckinCompletePage } from "../checkin-complete/checkin-complete";
import {BpModalPage} from "../bp-modal/bp-modal";
import {VitalsProvider} from "../../providers/vitals/vitals";
import {BP} from "../../models/bp";


/**
 * Generated class for the PatientDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-detail',
  templateUrl: 'patient-detail.html',
})
export class PatientDetailPage {
  BP_MIN_AGE: number = 19;
  loading: any;
  patientUuid: string;
  patientDetails : any;
  patient = {
    display: null,
    name: null,
    gender: null,
    age: null,
    birthdate: ''
  };
  age: number;
  bpAlert: string;
  bps:BP[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public utils: UtilsProvider,
              public omrs: OmrsProvider,
              public patientProvider: PatientProvider,
              public vitals: VitalsProvider) {
    this.patientUuid = navParams.get('data');
    //this.patientUuid = "42998366-5c29-11e0-91c4-0024217bbad0";
    console.log("patientUuid = " + this.patientUuid);
    this.getPatient();
    this.getBPs();
    this.bpAlert = "";
    this.bps = [];
  }

  getPatient(){
    this.patientProvider.getPatient(this.patientUuid).then( (result) => {
      this.patientDetails = result;
      //console.log('patientDetails = ' + this.patientDetails);
      if (result.hasOwnProperty("person")) {
        this.patient.display = this.patientDetails.display;
        this.patient.name = this.patientDetails.person.display;
        this.patient.birthdate  = new Date(this.utils.formatDate(this.patientDetails.person.birthdate)).toISOString();
        this.age = this.patientDetails.person.age;
      }

    }, (err) => {
      console.log("Failed to retrieve patient details");
    });
  }

  getBPs() {
    this.vitals.getBPs(this.patientUuid).then((result) => {
      let unfilteredBps: any = result;
      for (let bp of unfilteredBps) {
        let da: number = this.utils.daysAgo(bp['dateRecorded']);
        if (this.utils.daysAgo(bp['dateRecorded']) < 1) {
           this.bps.push(bp);
        }
      }
      this.bps = this.formatBPs(this.bps);
    });
  }

  voidBP() {

  }

  // sort date descending
  formatBPs(unformattedBPs) {
    let formattedBPs = [];
    unformattedBPs.map((bp) => {
      formattedBPs.push(bp);
    });
    formattedBPs.sort((a, b) => {
      if (a.dateRecorded < b.dateRecorded) {
        return 1;
      }
      else if (a.dateRecorded > b.dateRecorded) {
        return -1;
      }
      else {
        return 0;
      }
    });
    this.bpAlert = this.generateBPAlert(formattedBPs);
    return formattedBPs;
  }


  /*
  For all patients 19 years old or older measure and record the blood pressure
  If the patient is hypertensive ( SBP < 160 and DBP < 110 ) then record the BP in the EMR
  and check if HTN mastercard is on file
  If (SBP > 160 or DBP > 110) flag the patient to the clinician for a full repeat of the BP measurement
  After the clinician measures the patient’s BP again:
  If (SBP > 160 or DBP > 110) enroll the patient in the HTN program
  Else flag the patient for a required BP measurement at the next visit
   */
  generateBPAlert(bps) {
    let alert = '';

    if (bps.length > 0) {
      let latestSystolic: number = bps[0].systolic;
      let latestDiastolic: number = bps[0].diastolic;
      let nextLatestSystolic: number = 0;
      let nextLatestDiastolic: number = 0;

      if (bps.length > 1) {
        nextLatestSystolic = bps[1].systolic;
        nextLatestDiastolic = bps[1].diastolic;
      }

      if (latestSystolic > 160 && latestDiastolic > 110) {
        if (nextLatestSystolic > 160 && nextLatestDiastolic > 110) {
          alert = 'Enroll the patient in the HTN program!';
        }
        else {
          alert = 'Repeat the BP measurement!';
        }
      }
    }

    return alert;
  }

  goBack(){
    if (this.navCtrl.canGoBack() ) {
      this.navCtrl.pop();
    }
  }

  complete(){

    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'This is the "circles" spinner. It will dismiss after 3 seconds.',
      duration: 3000
    });

    this.loading.present();
    this.omrs.createVisitWithCheckIn(this.patientDetails).then( data => {
      console.log("visit created = " + data);
      this.loading.dismiss();
      this.navCtrl.push(CheckinCompletePage, {
        data: this.patientDetails
      });
    });


  }

  presentModal() {
    let modal = this.modalCtrl.create(BpModalPage, {patientUuid: this.patientUuid});
    modal.onDidDismiss(data => {
      this.bps.push(data);
      this.bps = this.formatBPs(this.bps);
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailPage');
  }

}
