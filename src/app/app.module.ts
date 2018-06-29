import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistriesPage } from '../pages/registries/registries';
import { DietPage } from '../pages/diet/diet';
import { MealPage } from '../pages/meal/meal';
import { FoodPage } from '../pages/food/food';
import { StockPage } from '../pages/stock/stock';
import { SearchPage } from '../pages/search/search';

import { StockModal } from '../pages/stock/stockModal/stockModal';
import { SelectFoodsModal } from '../pages/meal/selectFoodsModal/selectFoodsModal';
import { SelectMealsModal } from '../pages/diet/selectMealsModal/selectMealsModal';
import { SkipMealModal } from '../pages/home/skipMealModal/skipMealModal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SkipMealModal,
    RegistriesPage,
    DietPage,
    SelectMealsModal,
    MealPage,
    SelectFoodsModal,
    FoodPage,
    StockPage,
    StockModal,
    SearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: '_db',
      driverOrder: ['sqlite, indexeddb', 'websql']
    }),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SkipMealModal,
    RegistriesPage,
    DietPage,
    SelectMealsModal,
    MealPage,
    SelectFoodsModal,
    FoodPage,
    StockPage,
    StockModal,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLite
  ]
})
export class AppModule {}
