/* eslint-disable import/extensions */

import ctx from '../main.js';

import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(width, height, threeColor, twoColor, oneColor, x, y) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.threeColor = threeColor;
    this.twoColor = twoColor;
    this.oneColor = oneColor;
    this.status = 3;
  }

  render() {
    if (this.status > 0) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      if (this.status === 3) {
        ctx.fillStyle = this.threeColor;
      } else if (this.status === 2) {
        ctx.fillStyle = this.twoColor;
      } else {
        ctx.fillStyle = this.oneColor;
      }
      ctx.fill();
      ctx.closePath();
    }
  }
}

export default Brick;
