import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { DietPage } from '../diet/diet';
import { MealPage } from '../meal/meal';
import { FoodPage } from '../food/food';

import { Meal } from '../../utils/meal';
import { Diet } from '../../utils/diet';
import { Food } from '../../utils/food';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public readonly DIET_TYPE: Number = 1;
  public readonly MEAL_TYPE: Number = 2;
  public readonly FOOD_TYPE: Number = 3;

  private diets: Array<Diet>;
  private meals: Array<Meal>;
  private foods: Array<Food>;

  itemTypeName: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.itemTypeName = (navParams.get("itemTypeName")) ? "r " + navParams.get("itemTypeName") : "";
    this.diets = new Array<Diet>();
    this.meals = new Array<Meal>();
    this.foods = new Array<Food>();
    this.loadData();
  }

  onViewWillEnter () {
    this.loadData();
  }

  loadData () {
    this.databaseProvider.getAllDiets()
    .then(result => {
      this.diets = result;
    });
    this.databaseProvider.getAllMeals()
    .then(result => {
      this.meals = result;
    });
    this.databaseProvider.getAllFoods()
    .then(result => {
      this.foods = result;
    });
  }

  goToItemPage(itemId: Number, itemType: Number) {
    switch (itemType) {
      case this.DIET_TYPE:
        this.goToDietPage(itemId);
        break;
      case this.MEAL_TYPE:
        this.goToMealPage(itemId);
        break;
      case this.FOOD_TYPE:
        this.goToFoodPage(itemId);
        break;
    }
  }

  goToDietPage(itemId: Number) {
    this.navCtrl.push(DietPage, {
      dietId: itemId
    });
  }

  goToMealPage(itemId: Number) {
    this.navCtrl.push(MealPage, {
      itemId: itemId
    });
  }

  goToFoodPage (itemId) {
    this.navCtrl.push(FoodPage, {
      itemId: itemId
    });
  }
}
