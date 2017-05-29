import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditrecipePage} from "../editrecipe/editrecipe";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(private navCtrl: NavController) {}

  onNewRecipe() {
    this.navCtrl.push(EditrecipePage, {
      mode: 'New'
    });
  }

}
