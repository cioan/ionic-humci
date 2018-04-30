import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPatientProvider } from '../../providers/searchpatient/searchpatient';
import { UtilsProvider } from '../../providers/utils/utils';
import {PatientDetailPage} from "../patient-detail/patient-detail";

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

  patients: any;
  results: any;
  rowData: any;

  private gridApi;
  private dateUtils;
  private columnDefs;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public searchPatientProvider: SearchPatientProvider,
              public utils: UtilsProvider) {

    this.columnDefs = [
      {headerName: 'ID', valueGetter: 'data.identifiers[0].identifier' },
      {headerName: 'First Name', valueGetter: 'data.person.names[0].givenName' },
      {headerName: 'Last Name', valueGetter: 'data.person.names[0].familyName' },
      {headerName: 'Gender', field: 'person.gender' },
      {headerName: 'Age', field: 'person.age' },
      {
        headerName: 'Birthdate',
        field: 'person.birthdate',
        valueFormatter: this.dateFormatter.bind(this)
      }
    ];

    this.dateUtils = utils;
    this.getPatients();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  getPatients() {
    this.searchPatientProvider.getResults('George Cha').then( data => {
      this.patients = data;
      console.log("number of records returned = " + this.patients.length );
      this.rowData = this.patients;
    });
  }

  dateFormatter(params) {
    return this.dateUtils.formatDate(params.value);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.setRowData(this.patients);
  }

  filterPatients(ev: any) {
    let filterValue = ev.target.value;
    this.gridApi.setQuickFilter(filterValue);
  }

  selectPatient(ev: any){
    this.navCtrl.push(PatientDetailPage, {
      data: ev.data.uuid
    });
  }
}
