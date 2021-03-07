"use strict";

/**
Project 1
Darcy Harun

Ship fighting scene from STAR WARS???
*/

let space = {
  stars: [],
  ships: [],
  smallrocks: [],
  numStars: 1000,
  numShips: 1,
  numSmallrocks: 4,
  spaceColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  }
};

let asteroidImage = undefined;

let xWingImage = undefined;

// let angle = undefined;

/**
Description of preload
*/
function preload() {
  xWingImage = loadImage(`assets/images/x-wing.png`);

  asteroidImage = loadImage(`assets/images/asteroid1.png`);
  asteroidImage2 = loadImage(`assets/images/asteroid2.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowHeight,windowHeight);
  rectMode(CENTER);

  for (let i = 0; i < space.numStars; i++) {
    let star = new Star();
    space.stars.push(star)
  }

  for (let i = 0; i < space.numShips; i++) {
    let ship = new Ship();
    space.ships.push(ship)
  }

  for (let i = 0; i < space.numSmallrocks; i++) {
    let smallrock = new Smallrock();
    space.smallrocks.push(smallrock)
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
    star.animatePlay();
  }

  for (let i = 0; i < space.ships.length; i++) {
    let ship = space.ships[i];
    ship.display();
  }

  for (let i = 0; i < space.smallrocks.length; i++) {
    let smallrock = space.smallrocks[i];
    smallrock.display();
    smallrock.move();
  }

  // angle = atan2(mouseY - height / 2, mouseX - width / 2);
  //
  // push();
  // imageMode(CENTER);
  // translate(width/2, height/2);
  // rotate(angle);
  // image(xWingImage, 0, 0);
  // pop();

  // push();
  // textFont(`Gothic`);
  // textSize(108);
  // textAlign(CENTER, CENTER);
  // fill(255);
  // text(`WAR STARS`, width/2, height/3);
  // pop();

}
