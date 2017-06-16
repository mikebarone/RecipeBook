import { Recipe } from "../models/recipe.model";
import {Ingredient} from "../models/ingredient.model";
import {AuthService} from "./auth";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesService {

  private recipes: Recipe[] = [];

  constructor(private http: Http,
              private authService: AuthService) {}

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeRecipes(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://angularapp-4beb2.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
      .map(response => {
        return response.json();
      });
  }

  fetchRecipes(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://angularapp-4beb2.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
      .map(response => {
        const recipes: Recipe[] = response.json() ? response.json() : [];
        for(let item of recipes) {
          if(!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return recipes;
      })
      .do((data) => {
        this.recipes = data;
      });
  }
}
