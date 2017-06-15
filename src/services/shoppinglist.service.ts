import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppinglistService {

  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [];

  constructor(private http: Http,
              private authService: AuthService) {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://angularapp-4beb2.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map(response => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://angularapp-4beb2.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map(response => {
        return response.json();
      })
      .do((data) => {
        this.ingredients = data;
      });
  }
}
