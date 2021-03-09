"use strict";

/**
Project 1
Darcy Harun

Follow the Millennium Falcon through an asteroid field as
a rebel squadron X-wing...

If the player gets hit by a big enough asteroid or
or lets the falcon out of sight, it is game-over

The player x-wing is invincible for a short time after the game starts

*/

// Variables
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
  numBabyrocks: 12,
  numSmallrocks: 7,
  numBigrocks: 3,

  spaceColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  }
};

// JSON profile
let scoreProfile = {
  name: `--`,
  nickname: `--`,
  squad: `--`,
  score: `--`
};

let score = 0;
let scoreMultiplier = 1;

// JSON Data
let colorsData = undefined;
let animalsData = undefined;

// Images
let asteroidImage = undefined;
let asteroidImage2 = undefined;
let asteroidImage3 = undefined;
let xWingImage = undefined;
let millenniumFalconImage = undefined;

// Starts at title screen
let state = `title`;

// Angle for animated x-wing
let angle = undefined;

/**
  Preload JSON data and images
*/
function preload() {
  // Data
  colorsData = loadJSON(`assets/data/colors.json`);
  animalsData = loadJSON(`assets/data/animals.json`);

  // Images
  asteroidImage = loadImage(`assets/images/asteroid1.png`);
  asteroidImage2 = loadImage(`assets/images/asteroid2.png`);
  asteroidImage3 = loadImage(`assets/images/asteroid7.png`);
  xWingImage = loadImage(`assets/images/x-wing.png`);
  millenniumFalconImage = loadImage(`assets/images/millennium-falcon.png`);
}


/**
 Setup all objects and check profile data
*/
function setup() {
  createCanvas(windowHeight, windowHeight);
  rectMode(CENTER);
  frameRate(60);

  // Get local storage for data
  let data = JSON.parse(localStorage.getItem(`score-profile-data`));

  // If data is already there, get it
  if (data) {
    scoreProfile.name = data.name;
    scoreProfile.nickname = data.nickname;
    scoreProfile.squad = data.squad;
    scoreProfile.score = data.score;
  }
  // If there is no data, generate it
  else {
    generateScoreProfile();
  }

  // Create all the objects needed
  // Stars
  for (let i = 0; i < space.numStars; i++) {
    let star = new Star();
    space.stars.push(star)
  }
  // Player Ship
  for (let i = 0; i < space.numShips; i++) {
    let ship = new Ship();
    space.ships.push(ship)
  }
  // Millennium Falcon
  for (let i = 0; i < space.numBigships; i++) {
    let bigship = new Bigship();
    space.bigships.push(bigship)
  }
  // Deadly small asteroids
  for (let i = 0; i < space.numSmallrocks; i++) {
    let smallrock = new Smallrock();
    space.smallrocks.push(smallrock)
  }
  // Deadlier big asteroids
  for (let i = 0; i < space.numBigrocks; i++) {
    let bigrock = new Bigrock();
    space.bigrocks.push(bigrock)
  }
  // Harmless tiny asteroids
  for (let i = 0; i < space.numBabyrocks; i++) {
    let babyrock = new Babyrock();
    space.babyrocks.push(babyrock)
  }
}

// Generate Profile
function generateScoreProfile() {
  // Ask for name
  scoreProfile.name = prompt(`What is your name pilot?`);
  // Nickname
  let animal = random(animalsData.animals);
  scoreProfile.nickname = animal.name;
  // Squadron Colour
  scoreProfile.squad = random(colorsData.colors);
  // Score
  scoreProfile.score = score;
  // Save data
  localStorage.setItem(`score-profile-data`, JSON.stringify(scoreProfile));
}

/**
Description of draw()
*/
function draw() {
  // Draw space black space background
  background(space.spaceColor.r, space.spaceColor.g, space.spaceColor.b, space.spaceColor.a);

  // Animate & Display Stars
  for (let i = 0; i < space.stars.length; i++) {
    let star = space.stars[i];
    star.display();
    if (state === `play`) {
      star.animatePlay();
    } else {
      star.animateTitle();
    }
  }

  // Only use asteroids in play state
  if (state === `play`) {

    // Update score each frame by +1
    // Only while playing
    score = score + scoreMultiplier;

    // Animate & Display harmless asteroids
    for (let i = 0; i < space.babyrocks.length; i++) {
      let babyrock = space.babyrocks[i];
      babyrock.display();
      babyrock.move();
    }

    // Animate & Display small deadly asteroids
    for (let i = 0; i < space.smallrocks.length; i++) {
      let smallrock = space.smallrocks[i];
      smallrock.display();
      smallrock.move();

      // Check if it hits the player ship
      for (let j = 0; j < space.ships.length; j++) {
        let ship = space.ships[j];
        smallrock.collisionCheck(ship);
      }
    }

    // Animate & Display big deadly asteroids
    for (let i = 0; i < space.bigrocks.length; i++) {
      let bigrock = space.bigrocks[i];
      bigrock.display();
      bigrock.move();

      // Check if it hits the player ship
      for (let j = 0; j < space.ships.length; j++) {
        let ship = space.ships[j];
        bigrock.collisionCheck(ship);
      }
    }

    // Animate & Display Millennium Falcon
    for (let i = 0; i < space.bigships.length; i++) {
      let bigship = space.bigships[i];
      bigship.display();
      bigship.move();
    }

    // Display player ship
    for (let i = 0; i < space.ships.length; i++) {
      let ship = space.ships[i];
      if (ship.alive) {
        ship.display();
      }
    }
  }

  // Display title if in title state
  if (state === `title`) {
    titleScreen();
  }

  // Display end screen if in end state (when you lose)
  if (state === `end`) {
    endScreen();
  }
} // End of draw


function titleScreen() {

  // WAR STARS
  push();
  textFont(`Gothic`);
  textSize(108);
  textAlign(CENTER, CENTER);
  fill(255, 232, 31);
  text(`WAR STARS`, width / 2, height / 3.5);
  pop();

  // FOLLOW THE FALCON
  push();
  textFont(`Gothic`);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255, 232, 31);
  text(`! FOLLOW THE FALCON !`, width / 2, height / 2.5);
  pop();

  // click to start
  push();
  textFont(`Gothic`);
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`click to start`, width / 2, height / 1.1);
  pop();

  // make the title x-wing face the mouse
  angle = atan2(mouseY - height / 2, mouseX - width / 2);

  // x-wing image
  push();
  imageMode(CENTER);
  translate(width / 2, height / 2);
  rotate(angle);
  image(xWingImage, 0, 0);
  pop();

  // millennium falcon image
  push();
  imageMode(CENTER);
  translate(width / 2, height / 8);
  rotate(radians(-90));
  image(millenniumFalconImage, 0, 0);
  pop();

  // Displays previous mission in title screen
  let profile = `PREVIOUS MISSION

  Name -- ${scoreProfile.name}
  Nickname -- The ${scoreProfile.nickname}
  Squad -- ${scoreProfile.squad}
  Score -- ${scoreProfile.score} `;

  // Profile text
  push();
  textFont(`Gothic`);
  textSize(24);
  textAlign(LEFT, CENTER);
  fill(255, 232, 31);
  text(profile, width / 2 - 110, height / 1.4);
  pop();

  // Style box
  push();
  fill(255, 20);
  stroke(255, 159);
  strokeWeight(1);
  rect(width / 2, height / 1.4, width + 10, 200);
  pop();
}

function endScreen() {

  // Display Score Profile
  let profile = `! MISSION REPORT !

  Name -- ${scoreProfile.name}
  Nickname -- The ${scoreProfile.nickname}
  Squad -- ${scoreProfile.squad}
  Score -- ${scoreProfile.score} `;

  // Profile text
  push();
  textFont(`Gothic`);
  textSize(24);
  textAlign(LEFT, CENTER);
  fill(255, 232, 31);
  text(profile, width / 2 - 110, height / 2);
  pop();

  // Style box
  push();
  fill(255, 20);
  stroke(255, 159);
  strokeWeight(1);
  rect(width / 2, height / 2, width + 10, 200);
  pop();

  // click for new profile
  push();
  textFont(`Gothic`);
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`click for new profile`, width / 2, height / 6);
  pop();

  // don't click to retain previous saved score
  push();
  textFont(`Gothic`);
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(255);
  text(`* don't click to NOT save score`, width / 2, height / 7);
  pop();

}

// When the player lets the falcon out of bounds or
// or gets hit by an asteroid
function gameOver() {
  // score stops getting higher
  scoreMultiplier = 0;
  // count and update score to profile
  scoreProfile.score = score;
  // trigger end screen
  state = `end`;
}

function mousePressed() {

  // In title screen, click to start playing
  if (state === `title`) {
    state = `play`;
  }

  // In end screen, generate new name and profile
  if (state === `end`) {
    generateScoreProfile();
  }
}
