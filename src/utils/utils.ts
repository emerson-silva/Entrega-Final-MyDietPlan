import { NavController } from "ionic-angular";
import { FormControl } from "@angular/forms";

export class Utils {

  constructor() {
    //Constructor
  }

  toBoolean(bVal: any) {
      return (bVal==true) ? true : false;
  }
}

export class ArrayInputValidator {

  static isValid (formCtrl: FormControl) {
      if (isNaN(formCtrl.value)) {
        return "empty";
      } else if (formCtrl.value.length > 0) {
        return "empty";
      }
      return null;
  }
}