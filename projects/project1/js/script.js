"use strict";

/**
Project 1
Darcy Harun

Ship fighting scene from STAR WARS???
*/

let space = {
  stars: [],
  numStars: 1000,
  spaceColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  }
};

let xWingImage = undefined;

let angle = undefined;

/**
Description of preload
*/
function preload() {
  xWingImage = loadImage(`assets/images/a-wing.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  for (let i = 0; i < space.numStars; i++) {
    let star = new Star();
    space.stars.push(star)
  }
}

/**
Description of draw()
*/
function draw() {
  background(space.spaceColor.r, space.spaceColor.g, space.spaceColor.b, space.spaceColor.a);
  // console.log(check);

  for (let i = 0; i < space.stars.length; i++) {
    let star = space.stars[i];
    star.display();
    star.animateTitle();
  }

  angle = atan2(mouseY - height / 2, mouseX - width / 2);

  // push();
  // imageMode(CENTER);
  // translate(width/2, height/2);
  // rotate(90);
  // rotate(angle);
  // image(xWingImage, 0, 0);
  // pop();

  push();
  textFont(`Gothic`);
  textSize(108);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`WAR STARS`, width/2, height/3);
  pop();

}
