import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {compareAsc, format, isValid} from "date-fns";

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
    let date  = 'Invalid birthdate';
    // the date returned by OpenMRS web services looks like this:
    // "1995-07-01T00:00:00.000+0000"
    if (inputString ) {
      var arr = inputString.split(/[\-\+ :T]/);
      if (arr.length > 2) {
        let formatDate = new Date();
        formatDate.setUTCFullYear(arr[0], arr[1], arr[2]);
        if (isValid(formatDate)) {
          return format(formatDate, 'MM/DD/YYYY');
        }
      }
    }
    return date;
  }

  formatTime(inputString){
    if (inputString) {
      return format(new Date(inputString), 'h:mmA, D-MMM-YYYY');
    }
    return null;
  }

  compareDateAsc(dateLeft, dateRight) {
    if (dateLeft && dateRight) {
      let left = format(new Date(dateLeft));
      let right = format(new Date(dateRight));
      return compareAsc(left, right);
    }
    return null;
  }

  getCurrentDateTime() {
    return format(new Date(), 'h:mmA, D-MMM-YYYY');
  }

  getCurrentTime() {
    return format(new Date(), 'h:mmA');
  }

  parseDate(inputString) {
    if (inputString ) {
      var arr = inputString.split(/[\-\+ :T]/);
      if (arr.length > 2) {
        let formatDate = new Date();
        formatDate.setUTCFullYear(arr[0], arr[1], arr[2]);
        if (isValid(formatDate)) {
          return format(formatDate, 'MM/DD/YYYY');
        }
      }
    }
    return null;
  }
}
