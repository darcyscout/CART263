class Ship {

  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.angle = 0;
    this.alive = true;
    this.invincibilityTimer = 2;
  }

  display() {
    this.angle = atan2(mouseY - height / 2, mouseX - width / 2);

    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(xWingImage, 0, 0);
    pop();

    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer -= 0.01;
    }
  }

  destroyed() {
    if (this.invincibilityTimer < 0) {
      this.alive = false;
      gameOver();
    }
  }
}
