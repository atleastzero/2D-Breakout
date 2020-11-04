import ctx, { canvas } from './main';

import Sprite from './Sprite';

class Lives extends Sprite {
  constructor(font, color, left = 3) {
    super(canvas.width - 65, 20);
    this.font = font;
    this.color = color;
    this.left = left;
  }

  render() {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.left}`, canvas.width - 65, 20);
  }
}

export default Lives;
