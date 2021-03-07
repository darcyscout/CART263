class Ship {

  constructor() {
    this.x = 0;
    this.y = 0;
    this.image = undefined;
    this.angle = 0;
  }

  display() {

    this.angle = atan2(mouseY - height / 2, mouseX - width / 2);

    push();
    imageMode(CENTER);
    translate(width/2, height/2);
    rotate(this.angle);
    // fill(0,0,255);
    // rect(this.x,this.y,100,200);
    image(xWingImage, this.x, this.y);
    pop();
  }
}
