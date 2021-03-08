"use strict";

/**
Project 1
Darcy Harun

Ship fighting scene from STAR WARS???
*/

let space = {
  stars: [],
  ships: [],
  bigships: [],
  smallrocks: [],
  bigrocks: [],
  babyrocks: [],

  numStars: 700,
  numShips: 1,
  numBigships: 1,
  numBabyrocks: 5,
  numSmallrocks: 7,
  numBigrocks: 3,

  spaceColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  }
};

let score = 0;
let scoreMultiplier = 1;
let end = false;

let asteroidImage = undefined;
let asteroidImage2 = undefined;
let asteroidImage3 = undefined;
let xWingImage = undefined;
let millenniumFalconImage = undefined;


// let angle = undefined;

/**
Description of preload
*/
function preload() {
  asteroidImage = loadImage(`assets/images/asteroid1.png`);
  asteroidImage2 = loadImage(`assets/images/asteroid2.png`);
  asteroidImage3 = loadImage(`assets/images/asteroid7.png`);
  xWingImage = loadImage(`assets/images/x-wing.png`);
  millenniumFalconImage = loadImage(`assets/images/millennium-falcon.png`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowHeight,windowHeight);
  rectMode(CENTER);
  frameRate(60);

  for (let i = 0; i < space.numStars; i++) {
    let star = new Star();
    space.stars.push(star)
  }

  for (let i = 0; i < space.numShips; i++) {
    let ship = new Ship();
    space.ships.push(ship)
  }

  for (let i = 0; i < space.numBigships; i++) {
    let bigship = new Bigship();
    space.bigships.push(bigship)
  }

  for (let i = 0; i < space.numSmallrocks; i++) {
    let smallrock = new Smallrock();
    space.smallrocks.push(smallrock)
  }

  for (let i = 0; i < space.numBigrocks; i++) {
    let bigrock = new Bigrock();
    space.bigrocks.push(bigrock)
  }

  for (let i = 0; i < space.numBabyrocks; i++) {
    let babyrock = new Babyrock();
    space.babyrocks.push(babyrock)
  }
}

/**
Description of draw()
*/
function draw() {
  background(space.spaceColor.r, space.spaceColor.g, space.spaceColor.b, space.spaceColor.a);
  console.log(score);

  score = score + scoreMultiplier;

  for (let i = 0; i < space.stars.length; i++) {
    let star = space.stars[i];
    star.display();
    star.animatePlay();
  }

  for (let i = 0; i < space.babyrocks.length; i++) {
    let babyrock = space.babyrocks[i];
    babyrock.display();
    babyrock.move();
  }

  for (let i = 0; i < space.smallrocks.length; i++) {
    let smallrock = space.smallrocks[i];
      smallrock.display();
      smallrock.move();

    for (let j = 0; j < space.ships.length; j++) {
      let ship = space.ships[j];
      smallrock.collisionCheck(ship);
    }
  }

  for (let i = 0; i < space.bigrocks.length; i++) {
    let bigrock = space.bigrocks[i];
    bigrock.display();
    bigrock.move();

    for (let j = 0; j < space.ships.length; j++) {
      let ship = space.ships[j];
      bigrock.collisionCheck(ship);
    }
  }

  for (let i = 0; i < space.bigships.length; i++) {
    let bigship = space.bigships[i];
        bigship.display();
        bigship.move();
  }

  for (let i = 0; i < space.ships.length; i++) {
    let ship = space.ships[i];
      if (ship.alive) {
        ship.display();
    }
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

function titleScreen() {

}

function endScreen() {
  // Display Score
  // If score is higher than saved highscore replace highscore with current score
  // Ask what there name is to save with highscore
  // Each new name has its own highscore?
}

function gameOver() {
  background(255);
  scoreMultiplier = 0;
  end = true;
}
