import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

let apiUrl = 'https://bwenzi.pih-emr.org/openmrs/ws/rest/v1/patient';
let patientCustomRep = 'v=custom:(uuid,display,identifiers:(uuid,identifier,identifierType:(uuid),preferred),person:(uuid,display,gender,age,birthdate,birthdateEstimated,dead,deathDate,causeOfDeath,names,addresses,attributes))';

/*
  Generated class for the PatientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatientProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PatientProvider Provider');
  }

  getPatient(uuid:string) {

    return new Promise( (resolve, reject) => {

      this.http.get(window.location.origin + "/patient/" + uuid + "?" + patientCustomRep).subscribe(data => {
        console.log(data);
        resolve(data);
      }, (error: any) => {
        console.log("Error retrieving patient. error.status=" + error.status);
      });

    });

  }

}
