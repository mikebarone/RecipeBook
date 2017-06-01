import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditrecipePage} from "../editrecipe/editrecipe";
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../services/recipes.service";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(private navCtrl: NavController, private recipeService: RecipesService) {}

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditrecipePage, {
      mode: 'New'
    });
  }

  onLoadRecipe() {

  }

}
