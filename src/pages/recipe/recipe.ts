import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe.model";
import {EditrecipePage} from "../editrecipe/editrecipe";
import {ShoppinglistService} from "../../services/shoppinglist.service";
import {RecipesService} from "../../services/recipes.service";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe;
  index: number;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private slService: ShoppinglistService,
      private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditrecipePage, {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.index
    });
  }

  onAddIngredients() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
