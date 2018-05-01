import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientProvider } from '../../providers/patient/patient';
import { UtilsProvider } from '../../providers/utils/utils';


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
              public utils: UtilsProvider,
              public patientProvider: PatientProvider) {
    this.patientUuid = navParams.get('data');
    console.log("patientUuid = " + this.patientUuid);
    this.getPatient();

  }

  getPatient(){
    this.patientProvider.getPatient(this.patientUuid).then( (result) => {
      this.patientDetails = result;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailPage');
  }

}
