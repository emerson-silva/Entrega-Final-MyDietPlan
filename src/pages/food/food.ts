import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Food } from '../../utils/food';

import { DatabaseProvider } from '../../providers/database/database';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'food',
  templateUrl: 'food.html'
})
export class FoodPage {

  food: Food = new Food(null, null, null, null, null, null, 0, 0);
  disableSubmit: boolean;
  isEditing: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider, private formBuilder: FormBuilder) {

    if (navParams.get("foodId")!=null) {
      this.databaseProvider.getFood(this.navParams.get("foodId"))
      .then(result => {
        if (result!=null) {
          this.food = result;
        } else {
          this.food = new Food(null, null, null, null, null, null, 0, 0);
        }
      });
    }
  }

  ionViewWillEnter() {
    if(this.navCtrl!=null && this.databaseProvider!=null) {
      this.databaseProvider.getFood(this.navParams.get("foodId"))
      .then(result => {
        if (result!=null) {
          this.food = result;
        } else {
          this.food = new Food(null, null, null, null, null, null, 0, 0);
          this.enableEditing();
        }
      });
    }
  }

  isValid(food): boolean {
    if (food.name && food.name!=="" && food.carb && food.carb>=0
        && food.protein && food.protein>=0 && food.fat && food.fat>=0) {
          if (((+food.carb) + (+food.fat) + (+food.protein)) < 100) {
            return true;
          }
    }
    return false;
  }

  saveFood () {
    this.databaseProvider.saveFood(this.food)
    .then(result => {
      this.navCtrl.pop();
    });
  }

  deleteFood() {
    if (this.food && this.food!=null && this.food.id!=null) {
      this.databaseProvider.deleteFood(this.food.id)
      .then(result => {
        this.navCtrl.pop();
      });
    } else {
      this.navCtrl.pop();
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  cancelChanges() {
    this.navCtrl.pop();
  }
}
