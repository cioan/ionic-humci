import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  resposeData : any;
  userData = {"username":"", "password":""};

  constructor(public navCtrl: NavController,
              public authService:AuthServiceProvider,
              public navParams: NavParams) {

  }

  login(){
    if(this.userData.username && this.userData.password){
      this.authService.postData(this.userData, "login").then((result) =>{
        this.resposeData = result;
        console.log(this.resposeData);
        if(this.resposeData.user){
          localStorage.setItem('userData', JSON.stringify(this.resposeData) )
          this.navCtrl.push(TabsPage);
        }
        else{
          console.log("Please give valid username and password");
        }



      }, (err) => {
        //Connection failed message
        console.log("Failed to authenticate:" + err);
      });
    }
    else{
      console.log("Give username and password");
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
