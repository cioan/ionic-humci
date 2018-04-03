import { Component } from '@angular/core';
import {App, NavController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  userDetails : any;
  responseData: any;

  userPostData = {"user_id":"","token":""};

  constructor(public app: App,
              public navCtrl: NavController,
              public authService:AuthServiceProvider) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.user;

    this.userPostData.user_id = this.userDetails.systemId;
    this.userPostData.token = this.userDetails.uuid;
  }

  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout(){
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 1000);
  }

}
