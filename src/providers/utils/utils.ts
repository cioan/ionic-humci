import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {format, isValid} from "date-fns";

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UtilsProvider Provider');
  }

  formatDate(inputString) {
    var arr = inputString.split(/[\-\+ :T]/);
    if (arr.length > 2 ) {
      var formatDate = new Date();
      formatDate.setUTCFullYear(arr[0], arr[1], arr[2]);
      var validDate = isValid(formatDate);
      if (validDate) {
        return format(formatDate, 'MM/DD/YYYY');
      } else {
        return inputString;
      }

    } else {
      return 'Invalid birthdate';
    }
  }
}
