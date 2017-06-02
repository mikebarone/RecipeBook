import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe.model";

@IonicPage()
@Component({
  selector: 'page-editrecipe',
  templateUrl: 'editrecipe.html',
})
export class EditrecipePage implements OnInit{

  mode = 'New';
  selectOptions = ['Easy','Medium','Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private asCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeService: RecipesService,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initForm();
  }

  private initForm() {

    let recipeTitle = '';
    let recipeDescription = '';
    let recipeDifficulty = 'Easy';
    let recipeIngredients = [];

    if(this.mode == 'Edit') {
      recipeTitle = this.recipe.title;
      recipeDescription = this.recipe.description;
      recipeDifficulty = this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients) {
        recipeIngredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(recipeTitle, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'difficulty': new FormControl(recipeDifficulty, Validators.required),
      'ingredients': new FormArray(recipeIngredients)
    });
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {
          name: name,
          amount: 1
        };
      });
    }
    if(this.mode == "Edit") {
      this.recipeService.updateRecipe(this.index, value.title, value. description, value.difficulty, ingredients);
    } else {
      this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private createNewIngredientAlert () {
      return this.alertCtrl.create({
        title: 'Add Ingredient',
        inputs: [
          {
            name: 'name',
            placeholder: 'Name'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Add',
            handler: data => {
              if(data.name.trim() == '' || data.name == null) {
                const toast = this.toastCtrl.create({
                  message: 'Please enter a valid value',
                  duration: 1000,
                  position: 'bottom'
                });
                toast.present();
                return;
              }
              (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
              const toast = this.toastCtrl.create({
                message: 'Item Added',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        ]
      });
  }

  onManageIngredients() {
    const actionSheet = this.asCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove All Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for(let i = len -1; i>= 0; i--){
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients deleted',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
}
