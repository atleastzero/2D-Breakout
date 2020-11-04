import ctx from './main';

import Sprite from './Sprite';

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
