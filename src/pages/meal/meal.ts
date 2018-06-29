import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';

import { Meal } from '../../utils/meal';
import { SelectFoodsModal } from './selectFoodsModal/selectFoodsModal';
import { Food } from '../../utils/food';
import { FoodItem } from '../../utils/foodItem';

@Component({
  selector: 'meal',
  templateUrl: 'meal.html'
})
export class MealPage {

  meal: Meal = new Meal(null, null, null, []);
  foodItems: Array<FoodItem>;
  isEditing: boolean = false;

  constructor (public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider, private modalCtrl: ModalController) {
    this.foodItems = [];
    if (navParams.get("mealId")!=null) {
      this.databaseProvider.getMeal(this.navParams.get("mealId"))
      .then(result => {
        if (result!=null) {
          this.meal = result;
          this.loadFoods();
        } else {
          this.meal = new Meal(null, null, null, []);
          this.enableEditing();
        }
      });
      this.loadFoods();
    } else {
      this.meal = new Meal(null, null, null, []);
      this.enableEditing();
    }
  }

  updateFoods() {
    this.meal.foodItems = [];
    if (this.foodItems!=null && this.foodItems.length>0) {
      this.foodItems.forEach(foodItem => {
          this.meal.foodItems.push(foodItem);
      });
    }
  }

  loadFoods() {
    this.foodItems = [];
    if (this.meal.foodItems!=null) {
      (Array.from(this.meal.foodItems)).forEach((foodItem) => {
        this.databaseProvider.getFood(foodItem.food.id)
        .then(rFood => {
          if (rFood!=null) {
              this.foodItems.push(new FoodItem(rFood, foodItem.quantity));
          }
        });
      });
    }
  }

  openSelectFoodsModal () {
    let alreadyInMealFoodIds = [];
    if (this.meal.foodItems!=null) {
      alreadyInMealFoodIds = (Array.from(this.meal.foodItems)).map(foodItem => foodItem.food.id);
    }
    const foodsModal = this.modalCtrl.create(SelectFoodsModal, {selectedFoods: alreadyInMealFoodIds});
    foodsModal.present();
    foodsModal.onWillDismiss((foodIdArray) => {
      if (foodIdArray!=null) {
        let newFoodItemsArray = new Array<FoodItem>();
        this.foodItems.forEach(foodItem => {
          if (foodIdArray.indexOf(foodItem.food.id)>=0) {
            newFoodItemsArray.push(foodItem);
            foodIdArray.splice(foodIdArray.indexOf(foodItem.food.id), 1);
          }
        });
        this.databaseProvider.getFoodList(foodIdArray)
        .then(result => {
          if (result!=null) {
            result.forEach(food => {
              newFoodItemsArray.push(new FoodItem(food, 0));
            });
          }
          this.foodItems = newFoodItemsArray;
          this.updateFoods();
        });
      }
    });
  }

  saveMeal () {
    this.updateFoods();
    this.databaseProvider.saveMeal(this.meal)
    .then(result => {
      this.navCtrl.pop();
    });
  }

  deleteMeal() {
    if (this.meal && this.meal!=null && this.meal.id!=null) {
      this.databaseProvider.deleteMeal(this.meal.id)
      .then(result => {
        this.navCtrl.pop();
      });
    } else {
      this.navCtrl.pop();
    }
  }

  enableEditing () {
    this.isEditing = true;
  }

  cancelChanges() {
    this.navCtrl.pop();
  }

  isValid(meal): boolean {
    if (meal.name && meal.name!=="") {
      return true;
    }
    return false;
  }

}
