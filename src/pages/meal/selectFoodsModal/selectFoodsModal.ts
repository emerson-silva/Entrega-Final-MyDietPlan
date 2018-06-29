import { ModalController, NavController, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";

import { DatabaseProvider } from "../../../providers/database/database";
import { Food } from "../../../utils/food";
import { FoodPage } from "../../food/food";

@Component({
    selector: 'select-foods-modal',
    templateUrl: 'selectFoodsModal.html'
})

export class SelectFoodsModal {

    foods: Array<Food>;
    filteredFoods: Array<Food>;
    inputFilter: string;
    alreadySelectedFoods: Array<number>;
    selectedItems: Array<boolean>;

    constructor (private databaseProvider: DatabaseProvider, public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
        this.selectedItems = [];
        this.foods = [];
        this.filteredFoods = [];
        this.alreadySelectedFoods = navParams.get("selectedFoods");
        if (this.alreadySelectedFoods!=null && this.alreadySelectedFoods.length>0) {
            this.alreadySelectedFoods.forEach(element => {
                this.selectedItems[element] = true;
            });
        } else {
            this.alreadySelectedFoods = [];
        }
        this.reloadFoods(true);
    }

    reloadFilteredFoods() {
        this.filteredFoods = this.foods;
    }

    reloadFoods(reloadAll: boolean) {
        return this.databaseProvider.getAllFoods()
        .then(result => {
            if (result!=null) {
                this.foods = result.sort((a, b) => {
                    return ("" + a.name).localeCompare("" + b.name); 
                });
                if (reloadAll) {
                    this.reloadFilteredFoods();
                }
            } else {
                this.foods = new Array<Food>();
                if (reloadAll) {
                    this.reloadFilteredFoods();
                }
            }
        });
    }

    getItems(ev: any) {
        this.reloadFilteredFoods();
        const val = ev.target.value;

        if (val && val.trim() != '') {
            this.filteredFoods = this.filteredFoods.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    onCancel () {
        this.reloadFilteredFoods();
    }

    goToFoodPage () {
        this.navCtrl.push(FoodPage);
    }

    confirmSelection () {
        let foodArray = [];
        this.selectedItems.forEach((value, index) => {
            if (value) {
                foodArray.push(index);
            }
        });
        this.viewCtrl.dismiss(foodArray);
    }

    cancelSelection () {
        this.viewCtrl.dismiss(null);
    }

    ionViewWillEnter() {
        this.reloadFoods(true);
        this.inputFilter = "";
    }
}
