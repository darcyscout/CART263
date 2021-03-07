class Asteroid {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = 0;
    this.vy = 0;
    this.vx2 = random(random(-6,-2), random(2,6));
    this.vy2 = random(random(-6,-2), random(2,6));
    this.angle = random(0, 6.28319);
    this.vAngle = random(-0.008, 0.008);
    this.image = undefined;
    this.scrollSpeed = random(4, 7);
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(asteroidImage, 0, 0);
    pop();

    this.angle = this.angle + this.vAngle;
  }

  move() {
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

    this.vx = map(mouseX,0,width,this.scrollSpeed,-this.scrollSpeed);
    this.vy = map(mouseY,0,height,this.scrollSpeed,-this.scrollSpeed);

    this.x = this.x + this.vx + this.vx2;
    this.y = this.y + this.vy + this.vy2;
  }
}
