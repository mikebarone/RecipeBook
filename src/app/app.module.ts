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
import {RecipePage} from "../pages/recipe/recipe";
import {ShoppinglistService} from "../services/shoppinglist.service";
import {RecipesService} from "../services/recipes.service";
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";
import {AuthService} from "../services/auth";
import {SLOptionsPage} from "../pages/shoppinglist/sl-options/sl-options";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EditrecipePage,
    IngredientsPage,
    RecipesPage,
    ShoppinglistPage,
    RecipePage,
    SignupPage,
    SigninPage,
    SLOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EditrecipePage,
    IngredientsPage,
    RecipesPage,
    ShoppinglistPage,
    RecipePage,
    SignupPage,
    SigninPage,
    SLOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppinglistService,
    RecipesService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
