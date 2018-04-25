import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPatientProvider } from '../../providers/searchpatient/searchpatient';

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

  private gridApi;

  columnDefs = [
    {headerName: 'ID', valueGetter: 'data.identifiers[0].identifier' },
    {headerName: 'First Name', valueGetter: 'data.person.names[0].givenName' },
    {headerName: 'Last Name', valueGetter: 'data.person.names[0].familyName' },
    {headerName: 'Gender', field: 'person.gender' },
    {headerName: 'Age', field: 'person.age' },
    {headerName: 'Birthdate', field: 'person.birthdate', type: ['dateColumn'] }
  ];

  rowData: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public searchPatientProvider: SearchPatientProvider) {

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

  onGridReady(params) {
    console.log("onGridReady!");
    this.gridApi = params.api;
    params.api.setRowData(this.patients);
  }

}
