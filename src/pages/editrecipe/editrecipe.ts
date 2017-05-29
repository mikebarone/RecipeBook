import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-editrecipe',
  templateUrl: 'editrecipe.html',
})
export class EditrecipePage implements OnInit{

  mode = 'New';
  selectOptions = ['Easy','Medium','Hard'];

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
  }
}
