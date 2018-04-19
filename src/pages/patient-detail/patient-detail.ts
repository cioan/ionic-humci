import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientProvider } from '../../providers/patient/patient';

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
    gender: null,
    age: null,
    birthdate: '1990-02-19'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientProvider: PatientProvider) {
    this.patientUuid = navParams.get('data');
    console.log("patientUuid = " + this.patientUuid);
    this.getPatient();

  }

  getPatient(){
    this.patientProvider.getPatient(this.patientUuid).then( (result) =>{
      this.patientDetails = result;
      console.log("patientDetails = " + this.patientDetails);
      if (result.hasOwnProperty("person")) {
        this.patient.display = result.person.display;
        // this.patient.birthdate = result.person.birthdate;
        this.patient.birthdate  = new Date(result.person.birthdate).toISOString();
        // this.patient.birthdate = '1945-07-01T00:00:00.000+00:00';
      }

    }, (err) => {
      console.log("Failed to retrieve patient details");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailPage');
  }

}
