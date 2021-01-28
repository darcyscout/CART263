"use strict";

/*****************
Where's Sausage Dog?
Pippin Barr
Where's Waldo, except with a Sausage Dog!
Displays a large number of random rock images as well as
a single sausage dog image. The player needs to click on the
dog to win the game.
******************/

// Constants for image loading
const NUM_ROCK_IMAGES = 10;
const ROCK_IMAGE_PREFIX = `assets/images/rock`;
const SAUSAGE_DOG_IMAGE = `assets/images/limestone.png`;

// Number of images to display
const NUM_ROCKS = 100;

// Array of the loaded rock images
let rockImages = [];
// Array of rock objects
let rocks = [];
// Loaded sausage dog image
let limestoneImage;
// Sausage dog object
let limestone;

let state = `start` // Starting state preceeeeeding level 1, level 2, level 3, end

// preload()
// Loads all the rock images and the sausage dog image
function preload() {
  // Loop once for each rock image, starting from 0
  for (let i = 0; i < NUM_ROCK_IMAGES; i++) {
    // Load the image with the current number (starting from 0)
    let rockImage = loadImage(`${ROCK_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    rockImages.push(rockImage);
  }

  // Load the sausage dog image
  limestoneImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);
}


// setup()
// Creates all the rock objects and a sausage dog object
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  frameRate(60);
  textSize(24);

  createRocks();
  createLimestone();
}

// createRocks()
// Creates all the rocks at random positions with random rock images
function createRocks() {
  // Create the correct number of rocks
  for (let i = 0; i < NUM_ROCKS; i++) {
    // Create one random rock
    let rock = createRandomRock();
    // Add it to the rocks array
    rocks.push(rock);
  }
}

// createRandomRock()
// Create an rock object at a random position with a random image
// then return that created rock
function createRandomRock() {
  let x = random(0, width);
  let y = random(0, height);
  let rockImage = random(rockImages);
  let rock = new Rock(x, y, rockImage);
  rock.angle = random(0,360);
  return rock;
}

// createLimestone()
// Creates a sausage dog at a random position
function createLimestone() {
  let x = random(0, width);
  let y = random(0, height);
  limestone = new Limestone(x, y, limestoneImage);
}

// draw()
// Draws the background then updates all rocks and the sausage dog
function draw() {
  background(255, 255, 0);

  if (state === `start`) {
    startScreen();
  }
  else if (state === `play`) {
    updateRocks();
    updateLimestone();
  }
  else if (state === `end`) {
    endScreen();
  }
}

function startScreen() {
  text(`Click the Limestone.`,width/2,height/2);
  image(limestoneImage, width/2.5, height/2.1);
}

// updateRocks()
// Calls the update() method for all rocks
function updateRocks() {
  // Loop through all rocks
  for (let i = 0; i < rocks.length; i++) {
    // Update the current rock
    rocks[i].update();
  }
}

// updateLimestone()
// Calls the update() method of the sausage dog
function updateLimestone() {
  limestone.update();
}

function endScreen() {

}

// mousePressed()
// Automatically called by p5 when the mouse is pressed.
// Call the sausage dog's mousePressed() method so it knows
// the mouse was clicked.
function mousePressed() {
  limestone.mousePressed();

  if (state === `start`) {
    state = `play`;
  }
}
