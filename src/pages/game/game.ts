import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  imgUrl: string;
  level: number = 3;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imgUrl = navParams.get('url');
    this.level = navParams.get('level');
    console.log(this.imgUrl);
    console.log(this.level);
  }


  ionViewDidEnter() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    ctx.fillRect(0, 0, 100, 100);
  }
}
