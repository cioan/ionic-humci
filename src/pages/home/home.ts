import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestProvider } from '../../providers/rest/rest';
import {TabsPage} from "../tabs/tabs";
import {SearchPatientPage} from "../search-patient/search-patient";
import {AdduserPage} from "../adduser/adduser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  userDetails : any;
  responseData: any;

  users: any;

  userPostData = {"user_id":"","token":""};

  constructor(public app: App,
              public navCtrl: NavController,
              public authService:AuthServiceProvider,
              public restProvider: RestProvider) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.user;

    this.userPostData.user_id = this.userDetails.systemId;
    this.userPostData.token = this.userDetails.uuid;
    this.getUsers();
  }

  getUsers() {
    this.restProvider.getUsers()
      .then(data => {
        this.users = data;
        console.log(this.users);
      });
  }

  getItems(ev: any) {
    // reset the list back to all the user
    this.getUsers();
    // set val to the value of the searchbar
    let val = ev.target.value;

    console.log("getItems: val=" + val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((user) => {
        return (user.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  searchPatients() {
    this.navCtrl.push(SearchPatientPage);
  }
  addUser() {
    this.navCtrl.push(AdduserPage);
  }

  logout(){
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

}
