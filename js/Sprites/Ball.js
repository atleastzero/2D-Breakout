/* eslint-disable import/extensions */

import ctx from '../main.js';

import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(radius, color, x, y) {
    super(x, y);
    this.radius = radius;
    this.color = color;
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
