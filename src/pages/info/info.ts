import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  item: any;
  level: number = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
    console.log(this.item)
  }

  onSelectionChange(level: number) {
    this.level = level;
  }

  game() {
    console.log(this.level);
    this.navCtrl.push(GamePage, {
      url: this.item.url,
      level: this.level
    })
  }
}
