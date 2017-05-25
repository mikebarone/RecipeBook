import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EditrecipePage} from "../pages/editrecipe/editrecipe";
import {IngredientsPage} from "../pages/ingredients/ingredients";
import {RecipesPage} from "../pages/recipes/recipes";
import {ShoppinglistPage} from "../pages/shoppinglist/shoppinglist";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EditrecipePage,
    IngredientsPage,
    RecipesPage,
    ShoppinglistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EditrecipePage,
    IngredientsPage,
    RecipesPage,
    ShoppinglistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
