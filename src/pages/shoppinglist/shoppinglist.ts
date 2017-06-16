import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppinglistService} from "../../services/shoppinglist.service";
import {Ingredient} from "../../models/ingredient.model";
import {Subscription} from "rxjs";
import {SLOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth";

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
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

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
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({
      ev: event
    });
    popover.onDidDismiss(
      data => {
        if(data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      loading.dismiss();
                      if(list) {
                        this.ingredients = list;
                      } else {
                        this.ingredients = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  )
              }
            )
            .catch();
        } else if(data.action == 'store')  {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  )
              }
            )
            .catch();
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Error occured',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
