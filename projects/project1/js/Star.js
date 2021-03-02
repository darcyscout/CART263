class Star {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.size = 1;
    this.vx = 0;
    this.vy = 2;
  }

  display() {
    push();
    strokeWeight(this.size);
    stroke(255);
    point(this.x, this.y);
    pop();
  }

  animate() {
    if (this.y > height) {
      this.y = 0;
      this.x = random(0,width);
    }
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
}
