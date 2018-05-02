import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PatientProvider } from '../../providers/patient/patient';
import { UtilsProvider } from '../../providers/utils/utils';
import { OmrsProvider } from "../../providers/omrs/omrs";
import { CheckinCompletePage } from "../checkin-complete/checkin-complete";


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public utils: UtilsProvider,
              public omrs: OmrsProvider,
              public patientProvider: PatientProvider) {
    this.patientUuid = navParams.get('data');
    console.log("patientUuid = " + this.patientUuid);
    this.getPatient();

  }

  getPatient(){
    this.patientProvider.getPatient(this.patientUuid).then( (result) => {
      this.patientDetails = result;
      console.log('patientDetails = ' + this.patientDetails);
      if (result.hasOwnProperty("person")) {
        this.patient.display = this.patientDetails.display;
        this.patient.name = this.patientDetails.person.display;
        this.patient.birthdate  = new Date(this.utils.formatDate(this.patientDetails.person.birthdate)).toISOString();
      }

    }, (err) => {
      console.log("Failed to retrieve patient details");
    });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailPage');
  }

}
