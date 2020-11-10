/* eslint-disable import/extensions */

import ctx from '../main.js';

import Sprite from './Sprite.js';

class Score extends Sprite {
  constructor(font, color) {
    super(8, 20);
    this.font = font;
    this.color = color;
    this.total = 0;
  }

  increment(points = 1) {
    this.total += points;
  }

  render() {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.total}`, 8, 20);
  }
}

export default Score;
