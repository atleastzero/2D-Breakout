import ctx from './main';

import Sprite from './Sprite';

class Score extends Sprite {
  constructor(font, color) {
    super(8, 20);
    this.font = font;
    this.color = color;
    this.total = 0;
  }

  render() {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.total}`, 8, 20);
  }
}

export default Score;
