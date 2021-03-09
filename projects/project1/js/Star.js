class Star {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = 1;
    this.vx = 0;
    this.vy = 0;
    this.opacity = random(50, 255);
    this.scrollSpeed = random(2, 12);
  }

  display() {
    push();
    strokeWeight(this.size);
    stroke(255, this.opacity);
    point(this.x, this.y);
    pop();
  }

  animatePlay() {
    if (this.y > height) {
      this.y = this.y - height;
    }
    if (this.y < 0) {
      this.y = this.y + height;
    }
    if (this.x > width) {
      this.x = this.x - width;
    }
    if (this.x < 0) {
      this.x = this.x + width;
    }

    this.vx = map(mouseX, 0, width, this.scrollSpeed, -this.scrollSpeed);
    this.vy = map(mouseY, 0, height, this.scrollSpeed, -this.scrollSpeed);

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }

  animateTitle() {
    if (this.y > height) {
      this.y = this.y - height;
    }
    if (this.y < 0) {
      this.y = this.y + height;
    }
    if (this.x > width) {
      this.x = this.x - width;
    }
    if (this.x < 0) {
      this.x = this.x + width;
    }

    this.vx = -0.05;
    this.vy = 0.1;

    this.x = this.x + this.vx - this.scrollSpeed / 30;
    this.y = this.y + this.vy + this.scrollSpeed / 40;
  }
}
