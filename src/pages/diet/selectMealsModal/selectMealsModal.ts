import { ModalController, NavController, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";

import { DatabaseProvider } from "../../../providers/database/database";
import { Meal } from "../../../utils/meal";
import { MealPage } from "../../meal/meal";
import { MealGroup } from "../../../utils/mealGroup";

@Component({
    selector: 'select-meals-modal',
    templateUrl: 'selectMealsModal.html'
})

export class SelectMealsModal {

    mealGroup: MealGroup = new MealGroup(new Date(0,0,0,0,0,0,0), [], []);
    meals: Array<Meal>;
    filteredMeals: Array<Meal>;
    inputFilter: string;
    alreadySelectedMeals: Array<number>;
    selectedItems: Array<boolean>;

    constructor (private databaseProvider: DatabaseProvider, public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
        this.selectedItems = [];
        this.meals = [];
        this.filteredMeals = [];
        this.mealGroup = navParams.get("mealGroup");
        this.alreadySelectedMeals = this.mealGroup.mealIds;
        if (this.alreadySelectedMeals!=null && this.alreadySelectedMeals.length>0) {
            this.alreadySelectedMeals.forEach(element => {
                this.selectedItems[element] = true;
            });
        } else {
            this.alreadySelectedMeals = [];
        }
        this.reloadMeals(true);
    }

    reloadFilteredMeals() {
        this.filteredMeals = this.meals;
    }

    reloadMeals(reloadAll: boolean) {
        return this.databaseProvider.getAllMeals()
        .then(result => {
            if (result!=null) {
                this.meals = result.sort((a, b) => {
                    return ("" + a.name).localeCompare("" + b.name); 
                });
                if (reloadAll) {
                    this.reloadFilteredMeals();
                }
            } else {
                this.meals = new Array<Meal>();
                if (reloadAll) {
                    this.reloadFilteredMeals();
                }
            }
        });
    }

    getItems(ev: any) {
        this.reloadFilteredMeals();
        const val = ev.target.value;

        if (val && val.trim() != '') {
            this.filteredMeals = this.filteredMeals.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    onCancel () {
        this.reloadFilteredMeals();
    }

    goToMealPage () {
        this.navCtrl.push(MealPage);
    }

    confirmSelection () {
        let mealIdArray = new Array<number>();
        this.selectedItems.forEach((value, index) => {
            if (value) {
                mealIdArray.push(index);
            }
        });
        this.databaseProvider.getMealList(mealIdArray).then(result => {
            this.mealGroup.mealIds = mealIdArray;
            this.mealGroup.mealItems = result;
            this.viewCtrl.dismiss(this.mealGroup);
        });
    }

    cancelSelection () {
        this.viewCtrl.dismiss(this.navParams.get("mealGroup"));
    }

    ionViewWillEnter() {
        this.reloadMeals(true);
        this.inputFilter = "";
    }
}
