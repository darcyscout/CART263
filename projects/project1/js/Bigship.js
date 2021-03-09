class Bigship {

  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = 0;
    this.vy = 0;
    this.angle = -90;
    this.vx2 = 0;
    this.vy2 = -6;
    this.scrollSpeed = 12;
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(radians(this.angle));
    image(millenniumFalconImage, 0, 0);
    pop();
  }

  move() {
    if (this.y > height) {
      gameOver();
    }
    if (this.y < 0) {
      gameOver();;
    }
    if (this.x > width) {
      gameOver();
    }
    if (this.x < 0) {
      gameOver();
    }

    this.vx = map(mouseX, 0, width, this.scrollSpeed, -this.scrollSpeed);
    this.vy = map(mouseY, 0, height, this.scrollSpeed, -this.scrollSpeed);

    this.x = this.x + this.vx + this.vx2;
    this.y = this.y + this.vy + this.vy2;
  }
}
