import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppinglistService} from "../../services/shoppinglist.service";
import {Ingredient} from "../../models/ingredient.model";
import {Subscription} from "rxjs";
import {SLOptionsPage} from "./sl-options/sl-options";

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
  private subscription: Subscription;

  constructor(private slService: ShoppinglistService,
              private popoverCtrl: PopoverController) {}

  onSubmit(form: NgForm) {
    const value = this.ingredientForm.value;
    const newIngredient = new Ingredient(value.ingredientName, value.ingredientAmount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ionViewWillEnter() {
    this.ingredients = this.slService.getIngredients();
  }

  onRemoveIngredient(index: number) {
    this.slService.deleteIngredient(index);
  }

  onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({
      ev: event
    });
  }

}
