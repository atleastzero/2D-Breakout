class Sprite {
  constructor(x, y, width, height, color = 'red') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
    this.rotate = 0;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    return this;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotate * Math.PI) / 180);
    ctx.beginPath();
    // ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.fill()
    ctx.restore();
    return this;
  }
}

export default Sprite;
