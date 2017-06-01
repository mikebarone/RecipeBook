import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes.service";

@IonicPage()
@Component({
  selector: 'page-editrecipe',
  templateUrl: 'editrecipe.html',
})
export class EditrecipePage implements OnInit{

  mode = 'New';
  selectOptions = ['Easy','Medium','Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private asCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeService: RecipesService,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  private initForm() {

    let recipeTitle = '';
    let recipeDescription = '';

    this.recipeForm = new FormGroup({
      'title': new FormControl(recipeTitle, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'difficulty': new FormControl(this.selectOptions[0], Validators.required),
      'ingredients': new FormArray([])
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
    this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
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
