import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';

import { DietPage } from '../diet/diet';
import { FoodPage } from '../food/food';
import { MealPage } from '../meal/meal';

import { Diet } from '../../utils/diet';
import { Meal } from '../../utils/meal';
import { Food } from '../../utils/food';

@Component({
  selector: 'registries',
  templateUrl: 'registries.html'
})
export class RegistriesPage {

  showDiets: Boolean;
  showMeals: Boolean;
  showFoods: Boolean;

  diets: Array<Diet> = new Array<Diet>();
  meals: Array<Meal> = new Array<Meal>();
  foods: Array<Food> = new Array<Food>();

constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {

    this.showDiets = navParams.get('showDiets') ? true : false;
    this.showMeals = navParams.get('showMeals') ? true : false;
    this.showFoods = navParams.get('showFoods') ? true : false;
    this.reloadPageInfo();
  }

  goToDietPage(dietId) {
    this.navCtrl.push(DietPage, {
      dietId: dietId
    });
  }

  goToMealPage (mealId) {
    this.navCtrl.push(MealPage, {
      mealId: mealId
    });
  }

  goToFoodPage (foodId) {
    this.navCtrl.push(FoodPage, {
      foodId: foodId
    });
  }

  ionViewDidEnter() {
    this.reloadPageInfo();
  }

  toggleDiets() {
    this.showDiets = !this.showDiets;
    if (this.showDiets) {
      this.reloadDiets();
    }
  }

  toggleMeals() {
    this.showMeals = !this.showMeals;
    if (this.showMeals) {
      this.reloadMeals();
    }
  }

  toggleFoods() {
    this.showFoods = !this.showFoods;
    if (this.showFoods) {
      this.reloadFoods();
    }
  }

  reloadDiets() {
    this.databaseProvider.getAllDiets().then((result) => {
      this.diets = result;
    });
  }

  reloadMeals() {
    this.databaseProvider.getAllMeals().then((result) => {
      this.meals = result;
    });
  }

  reloadFoods() {
    this.databaseProvider.getAllFoods().then((result) => {
      this.foods = result;
    });
  }

  reloadPageInfo() {
    if (this.showDiets) {
      this.reloadDiets();
    }
    if (this.showMeals) {
      this.reloadMeals();
    }
    if (this.showFoods) {
      this.reloadFoods();
    }
  }

  deleteDietItem(id: number) {
    this.databaseProvider.deleteDiet(id).then(result => {
      this.reloadDiets();
    });
  }

  deleteMealItem(id: number) {
    this.databaseProvider.deleteMeal(id).then(result => {
      this.reloadMeals();
    });
  }

  deleteFoodItem(id: number) {
    this.databaseProvider.deleteFood(id).then(result => {
      this.reloadFoods();
    });
  }
}
