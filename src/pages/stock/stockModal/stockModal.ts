import { NavController, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";

import { Food } from "../../../utils/food";
import { DatabaseProvider } from "../../../providers/database/database";

@Component({
    selector: 'stock-modal',
    templateUrl: 'stockModal.html'
})

export class StockModal {

    food: Food = new Food(null, null, null, null, null, null, 0, 0);
    disableConfirm: boolean;
    quantityModifier: number;
    initialStock: number;

    constructor (private databaseProvider: DatabaseProvider, public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
        this.food = navParams.get("food");
        this.disableConfirm = false;
        this.quantityModifier = 0;
        this.initialStock = 0;
        if (this.food!=null) {
            this.initialStock = this.food.stockLevel;
        }
    }

    cancel () {
        this.food.stockLevel = this.initialStock;
        this.viewCtrl.dismiss();
    }

    onChangeQuantity() {
        this.updateQuantityModifier();
    }

    updateQuantityModifier() {
        this.quantityModifier = this.food.stockLevel - this.initialStock;
    }

    confirmStockLevel () {
        this.disableConfirm = true;
        this.databaseProvider.saveFood(this.food).then(result => {
            this.viewCtrl.dismiss();
        });
    }
}
