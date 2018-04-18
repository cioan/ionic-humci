import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PatientprofileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatientprofileProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PatientprofileProvider Provider');
  }

  getResults(uuid:string) {
    let headers = JSON.parse(localStorage.getItem('authHeaders'));
    return new Promise(resolve => {
      this.http.get(window.location.origin + "/patientprofile/" + uuid,
        {headers: headers}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
