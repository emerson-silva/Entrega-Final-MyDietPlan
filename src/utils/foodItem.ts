import { Food } from "./food";

export class FoodItem {
    food: Food;
    quantity: number;
    constructor (food: Food, quantity: number) {
        this.food = food;
        this.quantity = quantity;
    }
}