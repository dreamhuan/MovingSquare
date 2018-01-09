import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  imgUrl: string;
  level: number = 3;
  time: number = 0;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  //保存原图
  offCanvas: HTMLCanvasElement;
  offContext: CanvasRenderingContext2D;
  //显示原图
  imgCanvas: HTMLCanvasElement;
  imgContext: CanvasRenderingContext2D;
  //canvas的宽高
  WIDTH: number;
  HEIGHT: number;
  //一格的宽高
  ONE_WIDTH: number;
  ONE_HEIGHT: number;
  //canvas元素的左上角相对位置（用来计算鼠标坐标）
  OFFSET_X: number;
  OFFSET_Y: number;

  interval: number;
  image: HTMLImageElement;

  datas: number[];

  isFinished: boolean = false;
  isShowImg: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imgUrl = navParams.get('url');
    this.level = navParams.get('level');
    console.log(this.imgUrl);
    console.log(this.level);

    this.image = new Image();
    this.image.src = this.imgUrl;
  }

  //生命周期函数
  ionViewWillEnter() {
    this.canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    this.offCanvas = document.createElement('canvas');
    this.offContext = this.offCanvas.getContext('2d');

    this.imgCanvas = document.querySelector('#imgCanvas') as HTMLCanvasElement;
    this.imgContext = this.imgCanvas.getContext('2d');

    this.WIDTH = screen.availWidth * 0.8;
    this.HEIGHT = screen.availWidth * 1.1;

    this.ONE_WIDTH = this.WIDTH / this.level;
    this.ONE_HEIGHT = this.HEIGHT / this.level;

    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;

    this.offCanvas.width = this.WIDTH;
    this.offCanvas.height = this.HEIGHT;

    this.imgCanvas.width = this.WIDTH * 0.8;
    this.imgCanvas.height = this.HEIGHT * 0.8;

    this.initGame();
  }

  initGame() {

    this.context.drawImage(this.image,
      0, 0, this.image.width, this.image.height,
      0, 0, this.canvas.width, this.canvas.height);

    this.offContext.drawImage(this.canvas, 0, 0);
    this.imgContext.drawImage(this.canvas, 0, 0);

    this.time = 0;
    this.isFinished = false;
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);

    this.generate();
    this.draw();
  }

  generate() {
    //初始化
    this.datas = [];
    let len = this.level * this.level;
    for (let i = 0; i < len; i++) {
      this.datas.push(i + 1);
    }
    this.datas[ len - 1 ] = 0;

    //洗牌算法
    for (let i = 0; i < len; i++) {
      let r = (Math.random() * len >> 0) % len;
      this.swap(this.datas, i, r);
    }

    // 判断生成是否有解，无解就再来一遍
    if (!this.canSolve()) {
      this.generate();
    }
  }

  /**
   * 该数据是否有解
   * @param data int数组
   * @return 该数据是否有解
   *
   * 可行性原则：（随机打乱序列将会有一半的概率无解）
   * 拼图宽度为奇数时，序列逆序对数量为偶数有解
   * 宽度为偶数时，空格位于从下往上 奇 数行时逆序对数量为 偶 数有解，
   *               空格位于从下往上 偶 数行时逆序对数量为 奇 数有解。
   */
  canSolve(): boolean {
    // 获取空格下标
    let blank = this.datas.indexOf(0);
    // 可行性原则
    if (this.datas.length % 2 == 1) {
      return this.getInversions() % 2 == 0;
    } else {
      // 从底往上数,空格位于奇数行
      if (((blank) / this.level) % 2 == 1) {
        return this.getInversions() % 2 == 0;
      } else { // 从底往上数,空位位于偶数行
        return this.getInversions() % 2 == 1;
      }
    }
  }

  /**
   * 计算序列的逆序对数量
   *
   * @param data int数组
   * @return 逆序对数量
   */
  getInversions(): number {
    let inversions = 0;
    for (let i = 0; i < this.datas.length; i++) {
      let inversionCount = 0;
      for (let j = i + 1; j < this.datas.length; j++) {
        let index = this.datas[ i ];
        if (this.datas[ j ] != 0 && this.datas[ j ] < index) {
          inversionCount++;
        }
      }
      inversions += inversionCount;
    }
    return inversions;
  }


  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.isFinished) {
      this.context.drawImage(this.offCanvas, 0, 0);
      return;
    }
    // debugger;
    //每个数字减一得到下标 0减一变成-1了画的时候过滤
    let datas = this.datas.map(i => i - 1);
    for (let i = 0; i < datas.length; i++) {
      if (datas[ i ] < 0)
        continue;
      let srcX = datas[ i ] / this.level >> 0;
      let srcY = datas[ i ] % this.level;

      let dstX = i / this.level >> 0;
      let dstY = i % this.level;

      //因为canvas坐标的关系所以x y换一下
      this.context.drawImage(this.offCanvas,
        this.ONE_WIDTH * srcY, this.ONE_HEIGHT * srcX, this.ONE_WIDTH, this.ONE_HEIGHT,
        this.ONE_WIDTH * dstY, this.ONE_HEIGHT * dstX, this.ONE_WIDTH, this.ONE_HEIGHT);
    }
  }

  click(e: MouseEvent) {
    if (this.isFinished) {
      return;
    }
    let X = this.OFFSET_X = this.canvas.getBoundingClientRect().left >> 0;
    let Y = this.OFFSET_Y = this.canvas.getBoundingClientRect().top >> 0;
    //canvas坐标和数组下标的关系，所以x y换一下
    let y = (e.clientX - X) / this.ONE_WIDTH >> 0;
    let x = (e.clientY - Y) / this.ONE_HEIGHT >> 0;

    console.log(x, y);

    this.move(x, y);
    this.judge();
    this.draw();
  }

  //这里的x y可以理解为二维数组的下标
  move(x: number, y: number) {
    //二维换算到一维
    let index = x * this.level + y;
    //上下左右对应的都换算到一维的下标，越界的就是-1
    let up = x > 0 ? (x - 1) * this.level + y : -1;
    let down = x < this.level - 1 ? (x + 1) * this.level + y : -1;
    let left = y > 0 ? x * this.level + y - 1 : -1;
    let right = y < this.level - 1 ? x * this.level + y + 1 : -1;

    if (up !== -1 && this.datas[ up ] === 0) {
      this.swap(this.datas, index, up);

    } else if (down !== -1 && this.datas[ down ] === 0) {
      this.swap(this.datas, index, down);

    } else if (left !== -1 && this.datas[ left ] === 0) {
      this.swap(this.datas, index, left);

    } else if (right !== -1 && this.datas[ right ] === 0) {
      this.swap(this.datas, index, right);

    }
  }

  swap(arr: number[], i, j) {
    let t = arr[ i ];
    arr[ i ] = arr[ j ];
    arr[ j ] = t;
  }

  judge() {
    let str = this.datas.join('');
    if (str === '123456780') {
      console.log('finish');
      this.isFinished = true;
      clearInterval(this.interval);
    }
  }

  pic() {
    console.log('pic');
    //true表示显示图片，则改成不显示
    if (this.isShowImg) {
      this.isShowImg = false;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
      this.isFinished = false;

    } else {//false表示不显示图片状态，则改成显示
      this.isShowImg = true;
      clearInterval(this.interval);
      this.isFinished = true;
    }
  }

  reset() {
    console.log('reset');
    if (this.isShowImg) {
      this.pic();
    }
    clearInterval(this.interval);
    this.initGame();
  }

  back() {
    console.log('back');
    // 清除定时器
    clearInterval(this.interval);
    this.navCtrl.pop();
  }
}
