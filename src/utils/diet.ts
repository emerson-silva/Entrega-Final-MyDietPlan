import { Meal } from './meal';
import { MealGroup } from './mealGroup';
export class Diet {

    id: number;
    name: string;
    description: Text;
    mealGroups: Array<MealGroup>;

    constructor(id: number, name: string, description: Text, mealGroups: Array<MealGroup>) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.mealGroups = mealGroups;
    }

}