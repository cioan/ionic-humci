import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BP} from "../../models/bp";
import {UtilsProvider} from "../utils/utils";

/*
  Generated class for the VitalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VitalsProvider {

  constructor(public http: HttpClient, public utils: UtilsProvider) {
    console.log('Hello VitalsProvider Provider');
  }

  // systolic: https://bwenzi.pih-emr.org/openmrs/ws/rest/v1/obs?patient=42998366-5c29-11e0-91c4-0024217bbad0
  // &v=full&concept=6569bffe-977f-11e1-8993-905e29aff6c1
  // diastolic: 6569c116-977f-11e1-8993-905e29aff6c1
  // https://bwenzi.pih-emr.org/openmrs/ws/rest/v1/encounter?patient=42998366-5c29-11e0-91c4-0024217bbad0&v=full


  getBPs(patientUuid: string) {
    return new Promise( (resolve, reject) => {
      // let bp = new BP();
      // bp.systolic = 120;
      // bp.diastolic = 80;
      // bp.dateRecorded = new Date();
      // resolve([bp, bp]);

      let bps = [];
      this.http.get(window.location.origin + "/encounter?v=full&encounterType=vitals&patient="
        + patientUuid).subscribe(data => {
        // console.log(data);
        if (data.hasOwnProperty('results')) {
          let encounters: any[] = data['results'];
          encounters.map((encounter) => {
            let obs = encounter['obs'];
            let systolic:number = 0, diastolic:number = 0, dateRecorded:Date = new Date();
            obs.map((ob) => {
              if (ob['concept']['display'] == "Diastolic blood pressure") {
                diastolic = ob['value'];
              }
              else if (ob['concept']['display'] == "Systolic blood pressure") {
                systolic = ob['value'];
              }
              dateRecorded = this.utils.jsDateFromOmrsDate(ob['obsDatetime']);
            });
            if (systolic != 0 && diastolic != 0) {
              let bp = new BP();
              bp.systolic = systolic;
              bp.diastolic = diastolic;
              bp.dateRecorded = dateRecorded;
              bps.push(bp);
            }
          });
        }
        bps.sort((a, b) => {
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
        resolve(bps);
      }, (error: any) => {
        console.log("Error retrieving bps. error.status=" + error.status);
      });

    });
  }

  // required: [systolic, diastolic, dateRecorded], location, provider, encounterType
  // creates a new encounter
  saveBP(patientUuid: string, bp:BP, locationUuid, providerUuid) {
    // create new encounter with systolic and diastolic observations
    let systolicConceptUuid =  '6569bffe-977f-11e1-8993-905e29aff6c1';
    let diastolicConceptUuid = '6569c116-977f-11e1-8993-905e29aff6c1';
    let encounterTypeUuid = '664b82cc-977f-11e1-8993-905e29aff6c1'; // vitals
    //let locationUuid = '3093e2ab-0eee-4bc2-aacf-8d51d77c7698'; // Binje outreach clinic
    let encounter = {
      "patient": {
        "uuid": patientUuid
      },
      "location": locationUuid,
      "encounterType": {
        "uuid": encounterTypeUuid
      },
      "encounterDatetime": bp.dateRecorded,

      // TODO: figure out correct way to submit provider, produces error currently.
      // "encounterProviders":[
      //   {
      //     "provider":"bb1a7781-7896-40be-aaca-7d1b41d843a6",
      //     "encounterRole":"a0b03050-c99b-11e0-9572-0800200c9a66"
      //   }
      // ],

      "obs": [
        {
          "concept": systolicConceptUuid,
          "person": {
            "uuid": patientUuid
          },
          "obsDatetime": bp.dateRecorded,
          "location": {
            "uuid": locationUuid
          },
          "value": bp.systolic
        },
        {
          "concept": diastolicConceptUuid,
          "person": {
            "uuid": patientUuid
          },
          "obsDatetime": bp.dateRecorded,
          "value": bp.diastolic
        }
      ]
    };

    console.log(encounter);

    return new Promise( (resolve, reject) => {
      this.http.post(window.location.origin + "/encounter", encounter).subscribe(data => {
        //console.log(data);\
        bp.omrsUuid = data['uuid'];
        resolve(bp);
      }, (error: any) => {
        console.log("Error creating visit. error.status=" + error.status);
      });

    });
  }

}
