import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchPatientProvider } from '../../providers/searchpatient/searchpatient';
import { PatientProvider } from '../../providers/patient/patient';
import { OmrsProvider } from '../../providers/omrs/omrs';
import { UtilsProvider } from '../../providers/utils/utils';
import  {PatientDetailPage } from "../patient-detail/patient-detail";

/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

  loading: any;
  patients: any[];
  results: any;
  rowData: any;

  searchQuery: string = '';

  private gridApi;
  private dateUtils;
  private columnDefs;
  private rowClassRules;
  private getRowNodeId;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public searchPatientProvider: SearchPatientProvider,
              public omrsProvider: OmrsProvider,
              public utils: UtilsProvider) {

    this.columnDefs = [
      {headerName: 'patientUuid', hide: true, valueGetter: 'data.uuid' },
      {headerName: 'ID', valueGetter: 'data.identifier' },
      {headerName: 'First Name', valueGetter: 'data.firstName' },
      {headerName: 'Last Name', valueGetter: 'data.lastName' },
      {headerName: 'Gender', field: 'gender' },
      {headerName: 'Age', field: 'age' },
      {
        headerName: 'Checked-In',
        field: 'checkedInTime',
        valueFormatter: this.timeFormatter.bind(this)},
      {
        headerName: 'Birthdate',
        field: 'birthdate',
        valueFormatter: this.dateFormatter.bind(this)
      }
    ];

    this.getRowNodeId = function(data) {
      return data.id;
    }

    this.rowClassRules = {
      "checked-in-patient" : function(params) {
        return (params.data.checkedInTime) ;
      }
    };

    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Retrieving appointment list'
    });
    this.loading.present();

    this.dateUtils = utils;
    this.getPatients();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter CheckIn page");
  }

  getPatients() {

    this.searchPatientProvider.getResults('George Cha').then( data => {
      this.results = data;
      if (this.results) {
        this.patients = [];
        for (const item of this.results) {
          let patient = {
            uuid: item.uuid,
            id: item.id,
            firstName: item.person.names[0].givenName,
            lastName: item.person.names[0].familyName,
            gender: item.person.gender,
            age: item.person.age,
            identifier: item.identifiers[0].identifier,
            checkedInTime: null,
            birthdate: item.person.birthdate
          };
          this.patients.push(patient);
        }
      }
      console.log("number of records returned = " + this.patients.length );
      this.rowData = this.patients;
      this.loading.dismiss();
      this.updateVisitStartTime();
    });
  }

  updateVisitStartTime() {
    console.log("updateVisitStartTime ");
    for (let i = 0; i < this.patients.length; i++) {
      let patient = this.patients[i];
      this.omrsProvider.getVisits(patient.uuid).then( data => {
        let temp: any;
        temp = data;
        console.log("number of visits = "  + temp.results.length);
        if (temp.results.length > 0) {
          console.log("patient.uuid = " + patient.uuid );
          let myVisit: any;
          for (const visit of temp.results) {
            // get the most recent Active visit
            console.log("visit = " + visit.uuid + "; patientUuid = " + visit.patient.uuid + "; visit.startDatetime = " + visit.startDatetime);
            if ( myVisit && this.utils.compareDateAsc(myVisit.startDatetime, visit.startDatetime) ) {
               continue;
            }
            myVisit = visit;
          }
          this.patients[i].checkedInTime = myVisit.startDatetime;
          this.gridApi.redrawRows();
        }
      })
    }
  }

  dateFormatter(params) {
    if (params.value) {
      return this.dateUtils.formatDate(params.value);
    }

  }

  timeFormatter(params) {
    if (params.value) {
      return this.dateUtils.formatTime(params.value);
    }
  }

  onGridReady(params) {
    console.log("onGridReady ");
    params.api.setRowData(this.patients);
    params.api.sizeColumnsToFit();
    params.api.forEachNode( function(node, index) {
      console.log("node.data.id = " + node.data.id);
    });
    this.gridApi = params.api;
  }

  onModelUpdated(params) {
    console.log("model has been updated");
  }

  filterPatients(ev: any) {
    let filterValue = ev.target.value;
    if (filterValue !== 'cioan') {
      console.log("filterValue = " + filterValue);
      this.gridApi.setQuickFilter(filterValue);
    } else {
      ev.target.value = '';
    }

    this.gridApi.sizeColumnsToFit();

  }

  selectPatient(ev: any){
    this.navCtrl.push(PatientDetailPage, {
      data: ev.data.uuid
    });
  }
}
