import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'ionic2-auto-complete-ng5';
import { AgGridModule} from "ag-grid-angular";

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome'
import { LoginPage } from '../pages/login/login'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {SearchPatientPage} from "../pages/search-patient/search-patient";
import {PatientDetailPage} from "../pages/patient-detail/patient-detail";
import {AdduserPage} from "../pages/adduser/adduser";
import { CheckinPage } from "../pages/checkin/checkin";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestProvider } from '../providers/rest/rest';
import { SearchPatientProvider } from '../providers/searchpatient/searchpatient';
import { PatientProvider } from '../providers/patient/patient';

import { httpInterceptorProviders } from '../http-interceptors'
import { UtilsProvider } from '../providers/utils/utils';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginPage,
    TabsPage,
    SearchPatientPage,
    CheckinPage,
    PatientDetailPage,
    AdduserPage
  ],
  imports: [
    BrowserModule, HttpModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WelcomePage,
    LoginPage,
    TabsPage,
    SearchPatientPage,
    CheckinPage,
    PatientDetailPage,
    AdduserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    httpInterceptorProviders,
    AuthServiceProvider,
    RestProvider,
    SearchPatientProvider,
    PatientProvider,
    UtilsProvider
  ]
})
export class AppModule {}
