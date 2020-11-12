/* eslint-disable import/extensions */

import ctx, { canvas } from '../main.js';

import Sprite from './Sprite.js';

class Lives extends Sprite {
  constructor(font, color, left = 3) {
    super(canvas.width - 65, 20);
    this.font = font;
    this.color = color;
    this.left = left;
  }

  decrement() {
    this.left -= 1;
  }

  render() {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.left}`, canvas.width - 65, 20);
  }
}

export default Lives;
