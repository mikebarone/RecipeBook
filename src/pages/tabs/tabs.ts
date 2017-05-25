import { Component } from '@angular/core';
import {ShoppinglistPage} from "../shoppinglist/shoppinglist";
import {RecipesPage} from "../recipes/recipes";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  shoppinglistPage = ShoppinglistPage;
  recipesPage = RecipesPage;

  constructor() {

  }
}
