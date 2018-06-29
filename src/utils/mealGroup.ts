import { Meal } from "./meal";

export class MealGroup {
    date: Date = new Date(0, 0, 0, 0, 0, 0, 0);
    mealIds: Array<number> = new Array<number>();
    mealItems: Array<Meal> = new Array<Meal>();

    constructor(date: Date, mealIds: Array<number>, mealItems: Array<Meal>) {
        this.date = date;
        this.mealIds = mealIds;
        this.mealItems = mealItems;
    }
}