import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Diet } from '../../utils/diet';

import { SelectMealsModal } from './selectMealsModal/selectMealsModal';
import { DatabaseProvider } from '../../providers/database/database';
import { Meal } from '../../utils/meal';
import { MealGroup } from '../../utils/mealGroup';

@Component({
  selector: 'diet',
  templateUrl: 'diet.html'
})
export class DietPage {

  diet: Diet = new Diet(null, null, null, new Array<MealGroup>());
  isEditing: boolean = false;
  mealGroups: Array<MealGroup> = new Array<MealGroup>();
  setAsActive: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider, private modalCtrl: ModalController) {
    if (navParams.get("dietId")!=null) {
      databaseProvider.getDiet(navParams.get("dietId"))
      .then(result => {
        if (result!=null) {
          this.diet = result;
          if (this.diet.mealGroups==null) {
            this.diet.mealGroups = new Array<MealGroup>();
          }
          this.updateMeals();
        } else {
          this.edit();
        }
      }).then(result => {
        this.databaseProvider.getActiveDiet().then(result => {
          if (result!=null) {
            this.setAsActive = (this.diet.id == result.id);
          }
        });
      });
    } else {
      this.edit();
    }
  }

  ionViewWillEnter () {
    this.loadDiet();
  }

  loadDiet () {
    if(this.navCtrl!=null && this.databaseProvider!=null) {
      this.databaseProvider.getDiet(this.navParams.get("dietId"))
      .then(result => {
        if (result!=null) {
          this.diet = result;
        } else {
          this.diet = new Diet(null, null, null, new Array<MealGroup>());
          this.edit();
        }
      });
    }
  }

  updateMeals() {
    this.mealGroups = [];
    (Array.from(this.diet.mealGroups)).forEach(mealGroup => {
      this.databaseProvider.getMealList(Array.from(mealGroup.mealIds))
      .then(result => {
        if (result!=null) {
          this.mealGroups.push(new MealGroup(mealGroup.date,mealGroup.mealIds, result));
        } else {
          this.mealGroups.push(new MealGroup(mealGroup.date, [], []));
        }
        this.sortMealGroups();
      });
    });
  }

  updateDietMeals() {
    this.diet.mealGroups = this.mealGroups;
  };

  openSelectMealsModal (mealGroup: MealGroup) {
    const mealsModal = this.modalCtrl.create(SelectMealsModal, {mealGroup: mealGroup});
    mealsModal.present();
    mealsModal.onWillDismiss((updatedMealGroup) => {
      if (this.updateDietMeals!=null) {
        this.mealGroups[this.mealGroups.indexOf(mealGroup)] = updatedMealGroup;
        this.sortMealGroups();
      }
    });
  }

  sortMealGroups() {
    this.mealGroups = Array.from(this.mealGroups).sort((a, b) => {
      if (a==null) {
        a = new MealGroup(new Date(), [], []);
      }
      if (b==null) {
        b = new MealGroup(new Date(), [], []);
      }
      return ("" + a.date).localeCompare("" + b.date);
    });
  }

  addNewMealToDiet () {
    this.mealGroups.push(new MealGroup(new Date(0, 0, 0, 0, 0, 0, 0), [], []));
    this.sortMealGroups();
  }

  edit () {
    this.isEditing = true;
  }

  cancel () {
    this.navCtrl.pop();
  }

  isValid() {
    let isValid = false;
    if (this.diet.name) {
      isValid = true;
    }
    if (this.mealGroups.length>0) {
      isValid = true;
    }
    return isValid;
  }

  saveDiet () {
    this.updateDietMeals();
    this.databaseProvider.saveDiet(this.diet)
    .then((result) => {
      if (this.setAsActive) {
        this.databaseProvider.updateActiveDiet(result);
      }
    });
    this.navCtrl.pop();
  }

  deleteDiet() {
    if (this.diet && this.diet!=null && this.diet.id!=null) {
      this.databaseProvider.deleteDiet(this.diet.id)
      .then(result => {
        this.navCtrl.pop();
      });
    } else {
      this.navCtrl.pop();
    }
  }
}
