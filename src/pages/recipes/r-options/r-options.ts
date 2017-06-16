import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
@Component({
  selector: 'page-r-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3>Store & Load</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onAction('load')">Load Recipes</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onAction('store')">Save Recipes</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class ROptionsPage {

  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    this.viewCtrl.dismiss({
      action: action
    });
  }
}
