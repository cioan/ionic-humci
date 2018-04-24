import { AutoCompleteService } from 'ionic2-auto-complete-ng5';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

let apiUrl = 'https://bwenzi.pih-emr.org/openmrs/ws/rest/v1/patient';

/*
  Generated class for the SearchPatientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchPatientProvider implements AutoCompleteService{

  labelAttribute = "display";
  formValueAttribute = "uuid";

  constructor(public http: HttpClient) {
    console.log('Hello SearchPatientProvider Provider');
  }

  getResults(keyword:string) {

    return new Promise( (resolve, reject) => {
      this.http.get( window.location.origin + "/patient?q=" + keyword ).subscribe( data => {
        resolve(data.results.filter(item => item.display.toLowerCase().includes(keyword.toLowerCase())));

      });
    });
  }

}
