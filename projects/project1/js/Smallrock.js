class Smallrock {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = 0;
    this.vy = 0;
    this.vx2 = random(-2, 2);
    this.vy2 = random(-2 ,2);
    this.angle = random(0, 6.28319);
    this.vAngle = random(-0.1, 0.1);
    this.image = asteroidImage;
    this.scrollSpeed = random(10, 12);
    this.collisionRadius = 50;
  }

  collisionCheck(ship) {
    let d = dist(this.x, this.y, ship.x, ship.y);

    if (d < this.collisionRadius) {
      ship.destroyed();
    }
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

    this.angle = this.angle + this.vAngle;

    this.vx = map(mouseX,0,width,this.scrollSpeed,-this.scrollSpeed);
    this.vy = map(mouseY,0,height,this.scrollSpeed,-this.scrollSpeed);

    this.x = this.x + this.vx + this.vx2;
    this.y = this.y + this.vy + this.vy2;
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }
}
