import ctx, { canvas } from './main';

import Sprite from './Sprite';

class Paddle extends Sprite {
  constructor(width, height, color, x, y) {
    super(x, y);
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render() {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
