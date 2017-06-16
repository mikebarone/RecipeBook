import { Component } from '@angular/core';
import {
  AlertController, IonicPage, LoadingController, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {EditrecipePage} from "../editrecipe/editrecipe";
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../services/recipes.service";
import {RecipePage} from "../recipe/recipe";
import {AuthService} from "../../services/auth";
import {ROptionsPage} from "./r-options/r-options";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(private navCtrl: NavController,
              private recipeService: RecipesService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}


  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditrecipePage, {
      mode: 'New'
    });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {
      recipe: recipe,
      index: index
    });
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(ROptionsPage);
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
                this.recipeService.fetchRecipes(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if(list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
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
                this.recipeService.storeRecipes(token)
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
