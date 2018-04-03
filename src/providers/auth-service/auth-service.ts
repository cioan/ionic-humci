import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';



let apiUrl = 'https://humci.pih-emr.org/mirebalais/ws/rest/v1/session';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });

      if (credentials && credentials.username) {
        let base64 = btoa(credentials.username + ':' + credentials.password);

        headers.append('Authorization', 'Basic ' + base64);
      }

      this.http.get(window.location.origin + "/session" , {headers: headers}).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });


    });

  }

}
