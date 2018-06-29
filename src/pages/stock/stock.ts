import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';

import { Food } from '../../utils/food';
import { StockModal } from './stockModal/stockModal';

@Component({
    selector: 'stockPage',
    templateUrl: 'stock.html'
})
export class StockPage {
    foods: Array<Food> = new Array<Food>();

    constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider, public modalCtrl: ModalController) {
        this.reloadStockList();
    }

    reloadStockList() {
        this.databaseProvider.getAllFoods()
        .then((result) => {
            this.foods = result.sort((a, b) => {
                if (a==null) {
                    a = new Food(null, null, null, null, null, null, null, null);
                }
                if (b==null) {
                    b = new Food(null, null, null, null, null, null, null, null);
                }
                return ("" + a.name).localeCompare("" + b.name);
                });
        });
    }

    viewDidEnter() {
        if (this.databaseProvider!=null) {
            this.reloadStockList();
        }
    }

    openStockModal(food) {
        const foodsModal = this.modalCtrl.create(StockModal, {food: food});
        foodsModal.present();
    }

}