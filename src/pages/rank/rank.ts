import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

interface Score {
  date: string,
  time: string,
  type: number,
}

@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html'
})
export class RankPage {

  private allItems: Array<Score> = [];
  private items: Array<Score> = [];
  private title: string = '排行榜（3x3）';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });
    this.allItems.push({ date: '2017-2-1', time: '29s', type: 3 });

    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });
    this.allItems.push({ date: '2017-2-1', time: '129s', type: 4 });

    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });
    this.allItems.push({ date: '2017-2-1', time: '229s', type: 5 });

    this.showTop(3);
  }

  showTop(type: number) {
    switch (type) {
      case 3:
        this.items = this.allItems.filter(i => i.type === 3);
        this.title = '排行榜（3x3）';
        break;
      case 4:
        this.items = this.allItems.filter(i => i.type === 4);
        this.title = '排行榜（4x4）';
        break;
      case 5:
        this.items = this.allItems.filter(i => i.type === 5);
        this.title = '排行榜（5x5）';
        break;
      default:
        break;
    }
  }
}
