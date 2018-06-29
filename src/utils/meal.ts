import { Food } from './food';
import { FoodItem } from './foodItem';
export class Meal {

    id: number;
    name: string;
    description: Text;
    foodItems: Array<FoodItem>;

    constructor(id: number, name: string, description: Text, foodItems: Array<FoodItem>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.foodItems = foodItems;
    }
  }