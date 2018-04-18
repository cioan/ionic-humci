import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientprofileProvider} from "../../providers/patientprofile/patientprofile";

/**
 * Generated class for the PatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html',
})
export class PatientPage {

  uuid = '';
  idDisplay = '';
  personDisplay = '';
  age = -1;
  gender = '';
  dob = null;
  deceased = '';
  address1 = '';
  address2 = '';
  address3 = '';
  cityVillage = '';
  stateProvince = '';
  country = '';
  identifiers = [];
  attributes = [];
  demographics = '';
  address = '';
  attributeSummary = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public profileService: PatientprofileProvider) {
  }

  ionViewDidLoad() {
    this.uuid = this.navParams.get('uuid');
    this.profileService.getResults(this.uuid).then((result)=> {
        if (result.hasOwnProperty("patient")) {
          this.idDisplay = result.patient.display;
          this.personDisplay = result.patient.person.display;
          this.age = result.patient.person.age;
          this.gender = result.patient.person.gender;
          this.dob = new Date(result.patient.person.birthdate);
          this.deceased = result.patient.person.dead;

          this.demographics = this.constructDemographics();

          this.address1 = result.patient.person.preferredAddress.address1;
          this.address2 = result.patient.person.preferredAddress.address2;
          this.address3 = result.patient.person.preferredAddress.address3;
          this.cityVillage = result.patient.person.preferredAddress.cityVillage;
          this.stateProvince = result.patient.person.preferredAddress.stateProvince;
          this.country = result.patient.person.preferredAddress.country;

          this.identifiers = result.patient.identifiers;
          this.attributes = result.patient.person.attributes;
        }
      }
    )
  }

  constructDemographics() {
    let demogs = '';
    demogs = this.personDisplay != '' ? demogs + this.personDisplay : demogs;
    if (this.gender == 'F') this.gender = 'female';
    else if (this.gender == 'M') this.gender = 'male';
    demogs = this.gender != '' ? demogs + ', ' + this.gender : demogs;
    demogs = this.age != -1 ? demogs + ', age ' + this.age : demogs;
    demogs += ', born ' + (this.dob.getMonth() + 1) + "/" + this.dob.getDate() + "/" + this.dob.getFullYear();
    demogs = this.deceased ? demogs + ' (deceased)' : demogs;
    return demogs;
  }



}
