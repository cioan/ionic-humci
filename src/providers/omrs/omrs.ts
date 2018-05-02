import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';


/*
  Generated class for the OmrsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let NNO_LOCATION_UUID = '0d414ce2-5ab4-11e0-870c-9f6107fee88e';
let CLINIC_VISIT_TYPE_UUID = 'f01c54cb-2225-471a-9cd5-d348552c337c';
let ENCOUNTER_TYPE_UUID = '55a0d3ea-a4d7-4e88-8f01-5aceb2d3c61b';

@Injectable()
export class OmrsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OmrsProvider Provider');
  }

  createVisitWithCheckIn(patient: any) {
    if (patient ) {
      let encounterUuid = UUID.UUID();
      let today = new Date();
      let visit = {
        patient: patient.uuid,
        startDatetime: today,
        location: {
          uuid: NNO_LOCATION_UUID
        },
        visitType: {
          uuid: CLINIC_VISIT_TYPE_UUID
        },
        encounters: [
          {
            uuid: encounterUuid,
            patient: {
              uuid: patient.uuid
            },
            location: {
              uuid: NNO_LOCATION_UUID
            },
            encounterType: {
              uuid: ENCOUNTER_TYPE_UUID
            },
            encounterDatetime: today,
            voided: false
          }
        ],
        voided: false
      };

      return new Promise( (resolve, reject) => {
        this.http.post(window.location.origin + "/visit", visit).subscribe(data => {
          console.log(data);
          resolve(data);
        }, (error: any) => {
          console.log("Error creating visit. error.status=" + error.status);
        });

      });

    }
  }
}
