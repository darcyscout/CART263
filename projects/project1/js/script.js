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

let scoreProfile = {
  name: `--`,
  nickname: `--`,
  squad: `--`,
  score: `--`
};

let score = 0;
let scoreMultiplier = 1;
let end = false;

let colorsData = undefined;
let animalsData = undefined;

// Images
let asteroidImage = undefined;
let asteroidImage2 = undefined;
let asteroidImage3 = undefined;
let xWingImage = undefined;
let millenniumFalconImage = undefined;

let state = `title`;


let angle = undefined;

/**
Description of preload
*/
function preload() {
  colorsData = loadJSON(`assets/data/colors.json`);
  animalsData = loadJSON(`assets/data/animals.json`);

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


  let data = JSON.parse(localStorage.getItem(`score-profile-data`));
  scoreProfile.name = data.name;
  scoreProfile.nickname = data.nickname;
  scoreProfile.squad = data.squad;
  scoreProfile.score = data.score;

  if (!data === null) {
    generateScoreProfile();
}

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

function generateScoreProfile() {

  scoreProfile.name = prompt(`What is your name pilot?`);
  scoreProfile.nickname = random(animalsData.name);
  scoreProfile.squad = random(colorsData.colors);
  scoreProfile.score = score;
  localStorage.setItem(`score-profile-data`,JSON.stringify(scoreProfile));
}

/**
Description of draw()
*/
function draw() {
  background(space.spaceColor.r, space.spaceColor.g, space.spaceColor.b, space.spaceColor.a);

  score = score + scoreMultiplier;

  if (state === `play`) {

  }

  else if (state === `end`) {

  }

  for (let i = 0; i < space.stars.length; i++) {
    let star = space.stars[i];
    star.display();
    if (state === `play`) {
      star.animatePlay();
    }
    else {
      star.animateTitle();
    }
  }

  if (state === `play`) {
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
  }

  if (state === `title`) {
    titleScreen();
  }

  if (state === `end`) {
    endScreen();
  }

}

function titleScreen() {

  push();
  textFont(`Gothic`);
  textSize(108);
  textAlign(CENTER, CENTER);
  fill(255,232,31);
  text(`WAR STARS`, width/2, height/3.5);
  pop();

  push();
  textFont(`Gothic`);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255,232,31);
  text(`! FOLLOW THE FALCON !`, width/2, height/2.5);
  pop();

  angle = atan2(mouseY - height / 2, mouseX - width / 2);

  push();
  imageMode(CENTER);
  translate(width/2, height/2);
  rotate(angle);
  image(xWingImage, 0, 0);
  pop();

  push();
  imageMode(CENTER);
  translate(width/2, height/8);
  rotate(radians(-90));
  image(millenniumFalconImage, 0, 0);
  pop();

  let profile = `PREVIOUS MISSION

Name -- ${scoreProfile.name}
Nickname -- ${scoreProfile.nickname}
Squad -- ${scoreProfile.squad}
Score -- ${scoreProfile.score} `;

  push();
  textFont(`Gothic`);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255,232,31);
  text(profile, width/2, height/1.4);
  pop();

  push();
  fill(255,20);
  stroke(255,159);
  strokeWeight(1);
  rect(width/2, height/1.4, 250, 200);
  pop();
}

function endScreen() {

  let profile = `!MISSION REPORT!

  Name -- ${scoreProfile.name}
  Nickname -- ${scoreProfile.nickname}
  Squad -- ${scoreProfile.squad}
  Score -- ${scoreProfile.score} `;

  push();
  textFont(`Gothic`);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255,232,31);
  text(profile, width/2, height/1.4);
  pop();

  push();
  fill(255,20);
  stroke(255,159);
  strokeWeight(1);
  rect(width/2, height/1.4, 250, 200);
  pop();

  // Display Score
  // If score is higher than saved highscore replace highscore with current score
  // Ask what there name is to save with highscore
  // Each new name has its own highscore?
}

function gameOver() {
  scoreMultiplier = 0;
  state = `end`;
}

function mousePressed() {

  if (state === `title`) {
    state = `play`;
  }
}
