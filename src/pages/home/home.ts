import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { Diet } from '../../utils/diet';
import { Meal } from '../../utils/meal';
import { MealGroup } from '../../utils/mealGroup';

import { RegistriesPage } from '../registries/registries';
import { SkipMealModal } from './skipMealModal/skipMealModal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private selectedOptionIndex: number;
  private mealGroup: MealGroup;
  private mealOptions: Array<Meal>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider, private modalCtrl: ModalController) {
    this.selectedOptionIndex = 0;
    this.updateMeal();
  }

  updateMeal() {
    this.databaseProvider.getNextMeal()
    .then(result => {
      this.mealGroup = result;
      this.selectedOptionIndex = 0;
      if (this.mealGroup!=null) {
        this.databaseProvider.getMealList(this.mealGroup.mealIds)
        .then ((result) => {
          if (result!=null) {
            this.mealOptions = result;
          } else {
            this.mealOptions = [];
          }
        });
      }
    });
  }

  containsStock(meal) {
    let containsStock = true;
    if (meal!=null && meal.foodItems!=null) {
      meal.foodItems.forEach(foodItem => {
        if (foodItem!=null && meal.food!=null && foodItem.quantity > meal.food.quantity) {
          containsStock = false;
        }
      });
    }
    return containsStock;
  }

  confirmOption() {
    this.databaseProvider.registryMeal(this.mealGroup.mealItems[this.selectedOptionIndex])
    .then(result => {
      this.updateMeal();
    });
  }

  openSkipMealModal() {
    const foodsModal = this.modalCtrl.create(SkipMealModal, null);
    foodsModal.present();
    foodsModal.onWillDismiss((result) => {
      if (result) {
        this.updateMeal();
      }
    });
  }

  goToRegistriesPage() {
    this.navCtrl.push(RegistriesPage, {
      showDiets: true
    });
  }

}
