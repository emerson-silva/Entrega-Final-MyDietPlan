import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Diet } from '../../utils/diet';
import { Meal } from '../../utils/meal';
import { Food } from '../../utils/food';

@Injectable()
export class DatabaseProvider {

  constructor(private storage: Storage) {
    storage.get("databaseFilled")
    .then((val) => {
      if (val!=true) {
        this.fillDatabase();
      }
    });
  }

  // Dietas
  saveDiet(diet: Diet) {
    if (diet.id==null || diet.id==undefined) {
      this.storage.get("nextDietId")
      .then(result => {
        diet.id = result;
        this.storage.set("nextDietId", diet.id + 1);
      });
    }
    return this.storage.get("diets")
    .then(diets => {
      let dietMap = new Map<number, Diet>();
      if (diets!=null) {
        dietMap = new Map<number, Diet>(JSON.parse(diets));
      }
      dietMap.set(diet.id, diet);
      return this.storage.set("diets", JSON.stringify(Array.from(dietMap.entries())))
      .then(result => {
        return diet.id;
      });
    });
  }

  getDiet (id) {
    return this.storage.get("diets")
    .then(diets => {
      if (diets!=null) {
        let dietMap = new Map<number, Diet>(JSON.parse(diets));
        return dietMap.get(id);
      }
    }).catch(error => {
      return null;
    });
  }

  getAllDiets () {
    return this.storage.get("diets").then((diets) => {
      if (diets!=null) {
        let dietsMap = new Map<number, Diet>(JSON.parse(diets));
        return Array.from(dietsMap.values());
      } else {
        return new Array<Diet>();
      }
    });
  }

  deleteDiet (id) {
    return this.storage.get("diets")
    .then(diets => {
      let dietsMap = new Map<number, Diet>();
      if (diets!=null) {
        dietsMap = new Map<number, Diet>(JSON.parse(diets));
      }
      dietsMap.delete(id);
      this.storage.set("diets", JSON.stringify(Array.from(dietsMap.entries())));
    });
  }

  //Refeicoes
  saveMeal(meal: Meal) {
    if (meal.id==null || meal.id==undefined) {
      this.storage.get("nextMealId")
      .then(result => {
        meal.id = result;
        this.storage.set("nextMealId", meal.id + 1);
      });
    }
    return this.storage.get("meals")
    .then(meals => {
      let mealMap = new Map<number, Meal>();
      if (meals!=null) {
        mealMap = new Map<number, Meal>(JSON.parse(meals));
      }
      mealMap.set(meal.id, meal);
      this.storage.set("meals", JSON.stringify(Array.from(mealMap.entries())));
    });
  }

  getMeal (id) {
    return this.storage.get("meals")
    .then(meals => {
      if (meals!=null) {
        let mealMap = new Map<number, Meal>(JSON.parse(meals));
        return mealMap.get(id);
      }
    }).catch(error => {
      return null;
    });
  }

  getMealList(mealIds: Array<number>) {
    return this.getAllMeals().then(result => {
      if (mealIds!=null && result!=null) {
        return result.filter((item) => {
          return mealIds.indexOf(item.id) >= 0;
        });
      } else {
        return [];
      }
    });
  }

  getAllMeals () {
    return this.storage.get("meals").then((meals) => {
      if (meals!=null) {
        let mealsMap = new Map<number, Meal>(JSON.parse(meals));
        return Array.from(mealsMap.values());
      } else {
        return new Array<Meal>();
      }
    });
  }

  deleteMeal (id) {
    return this.storage.get("meals")
    .then(meals => {
      let mealsMap = new Map<number, Meal>();
      if (meals!=null) {
        mealsMap = new Map<number, Meal>(JSON.parse(meals));
      }
      mealsMap.delete(id);
      this.storage.set("meals", JSON.stringify(Array.from(mealsMap.entries())));
    });
  }

  // Alimentos
  saveFood(food: Food) {
    if (food.id==null || food.id==undefined) {
      this.storage.get("nextFoodId")
      .then(result => {
        food.id = result;
        this.storage.set("nextFoodId", food.id + 1);
      });
    }
    return this.storage.get("foods")
    .then(foods => {
      let foodMap = new Map<number, Food>();
      if (foods!=null) {
        foodMap = new Map<number, Food>(JSON.parse(foods));
      }
      foodMap.set(food.id, food);
      this.storage.set("foods", JSON.stringify(Array.from(foodMap.entries())));
    });
  }

  getFood (id) {
    return this.storage.get("foods")
    .then(foods => {
      if (foods!=null) {
        let foodMap = new Map<number, Food>(JSON.parse(foods));
        return foodMap.get(id);
      }
    }).catch(error => {
      return null;
    });
  }

  getFoodList(foodIds: Array<number>) {
    return this.getAllFoods().then(result => {
      if (foodIds!=null && result!=null) {
        return result.filter((item) => {
          return foodIds.indexOf(item.id) >= 0;
        });
      } else {
        return [];
      }
    });
  }

  getAllFoods () {
    return this.storage.get("foods").then((foods) => {
      if (foods!=null) {
        let foodsMap = new Map<number, Food>(JSON.parse(foods));
        return Array.from(foodsMap.values());
      } else {
        return new Array<Food>();
      }
    });
  }

  deleteFood (id) {
    return this.storage.get("foods")
    .then(foods => {
      let foodsMap = new Map<number, Food>();
      if (foods!=null) {
        foodsMap = new Map<number, Food>(JSON.parse(foods));
      }
      foodsMap.delete(id);
      this.storage.set("foods", JSON.stringify(Array.from(foodsMap.entries())));
    });
  }

  //System Aux
  private fillDatabase() {
    this.storage.set("nextDietId", 0);
    this.storage.set("nextMealId", 0);
    this.storage.set("nextFoodId", 0);
    this.storage.set("mealHistory", []);
    this.storage.set("diets", null);
    this.storage.set("meals", null);
    this.storage.set("foods", null);
    this.storage.set("activeDiet", null),
    this.storage.set("databaseFilled", true);
  }

  getDatabaseState () {
    return this.storage.get("databaseFilled");
  }

  updateActiveDiet (id) {
    return this.storage.set("activeDiet", id);
  }

  getActiveDiet () {
    return this.storage.get("activeDiet")
    .then(id => {
      if (id!=null) {
        return this.getDiet(id);
      }
    }).catch(error => {
      return null;
    });
  }

  registryMeal (meal: Meal) {
    let actualDate = new Date();
    let mealId = meal.id;
    let foodItems = meal.foodItems;
    if (foodItems!=null) {
      foodItems.forEach((foodItem) => {
        this.getFood(foodItem.food.id)
        .then(result => {
          let newStockLevel = result.stockLevel;
          newStockLevel-=foodItem.quantity;
          if (newStockLevel<0) {
            newStockLevel = 0;
          }
          result.stockLevel = newStockLevel;
          this.saveFood(result);
        });
      });
    }
    return this.storage.get("mealHistory")
    .then(mealHistory => {
      if (mealHistory==null) {
        mealHistory = [];
      }
      mealHistory.push({mealId: mealId, datetime: actualDate});
      this.storage.set("mealHistory", mealHistory);
    });
  }

  skipMeal () {
    let actualDate = new Date();
    return this.storage.get("mealHistory")
    .then(mealHistory => {
      if (mealHistory==null) {
        mealHistory = [];
      }
      mealHistory.push({mealId: "skip", datetime: actualDate});
      this.storage.set("mealHistory", mealHistory);
    });
  }

  getNextMeal () {
    return this.getActiveDiet()
    .then((activeDiet) => {
      if (activeDiet!=null) {
        return this.storage.get("mealHistory")
        .then(mealHistory => {
          if (mealHistory==null) {
            mealHistory = [];
          }
          if (activeDiet.mealGroups==null) {
            activeDiet = [];
          }
          let dietLength = activeDiet.mealGroups.length;
          let historyLength = mealHistory.length;
          let mealIndex = historyLength % dietLength;

          if (activeDiet.mealGroups.length>mealIndex) {
            return activeDiet.mealGroups[mealIndex];
          }
        });
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
  }
}
