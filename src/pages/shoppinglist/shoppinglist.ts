import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppinglistService} from "../../services/shoppinglist.service";
import {Ingredient} from "../../models/ingredient.model";

@IonicPage()
@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage implements OnInit {

  @ViewChild('f') ingredientForm: NgForm;
  ingredients: Ingredient[];
  editMode = false;
  editedItemIndex: number;

  constructor(private slService: ShoppinglistService) {}

  onSubmit(form: NgForm) {
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(value.ingredientName, value.ingredientAmount);
    // console.log(this.ingredientForm.value.ingredientName);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnInit() {
    // this.ingredients = this.slService.getIngredients();
    // console.log('Ingredients: '+this.ingredients);
  }

  ionViewDidEnter() {
    // this.ingredients = this.slService.getIngredients();
    // console.log('Ingredients: '+this.ingredients);
  }

}
