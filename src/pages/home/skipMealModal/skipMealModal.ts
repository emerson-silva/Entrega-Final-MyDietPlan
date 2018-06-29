import { ModalController, ViewController } from "ionic-angular";
import { Component } from "@angular/core";

import { DatabaseProvider } from "../../../providers/database/database";

@Component({
    selector: 'skip-meal-modal',
    templateUrl: 'skipMealModal.html'
})

export class SkipMealModal {

    constructor (private databaseProvider: DatabaseProvider, private viewCtrl: ViewController) {
    }

    confirm () {
        this.databaseProvider.skipMeal().then((result) => {
            this.viewCtrl.dismiss(true);
        });
    }

    cancel () {
        this.viewCtrl.dismiss(false);
    }
}
