/**
Bubble Popper Plus
Darcy Harun with the help of Pippin Barr
Turns the index finger as seen through the webcam into a pin that can pop
a bubble that floats from the bottom of the screen to the top.
Uses:
Pippin Barr's Bubble Popper activity code
ml5.js Handpose:
https://learn.ml5js.org/#/reference/handpose
*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];

// The bubble we will be popping
let bubble;
// The pin
let pin = {
  tip: {
    x: undefined,
    y: undefined
  },
  head: {
    x: undefined,
    y: undefined,
    size: 20
  }
};

// Number of times the pin pops the bubble
// Also displayed in the center of the screen
let pops = 0;

/**
Starts the webcam and the Handpose, creates a bubble object
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.size(width,height); // Size the video to fit the canvas
  video.hide();

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `running`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  // Create our basic bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    red: 100, // Used for dynamic colour changing
    vx: 0,
    vy: -2
  }
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
  // Use these lines to see the video feed
  // const flippedVideo = ml5.flipImage(video);
  // image(flippedVideo, 0, 0, width, height);

  // Use this line to just see a black background. More theatrical!
  background(0);

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // If yes, then get the positions of the tip and base of the index finger
    updatePin(predictions[0]);

    // Check if the tip of the "pin" is touching the bubble
    let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      // Pop! Pops counter goes up by one
      pops = pops + 1;
      resetBubble();
    }
    // Display the current position of the pin
    displayPin();
  }

  // Handle the bubble's movement and display (independent of hand detection
  // so it doesn't need to be inside the predictions check)
  moveBubble();
  checkOutOfBounds();
  displayBubble();
  displayOverlay();
}

/**
Updates the position of the pin according to the latest prediction
*/
function updatePin(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

/**
Resets the bubble to the bottom of the screen in a new x position
*/
function resetBubble() {
  bubble.x = random(width);
  bubble.y = height;
}

/**
Moves the bubble according to its velocity
*/
function moveBubble() {
  bubble.x += bubble.vx; // Primordial x-velocity, there so vy doesn't get so lonely
  // As number of pops increases, so does the speed of the bubble
  bubble.y += bubble.vy - (pops*0.1);
}

/**
Resets the bubble if it moves off the top of the canvas
*/
function checkOutOfBounds() {
  if (bubble.y < 0) {
    resetBubble();
  }
}

/**
Displays the bubble as a circle
*/
function displayBubble() {
// The colour of the bubble dynamically changes in red value based on the pin position
  let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
  bubble.red = map(d,0,width,100,255);

  push();
  noStroke();
  fill(bubble.red, 100, 200, 150);
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}

/**
Displays the pin based on the tip and base coordinates. Draws
a line between them and adds a red pinhead.
*/
function displayPin() {
  // Draw pin
  push();
  stroke(255);
  strokeWeight(2);
  line(pin.tip.x, pin.tip.y, pin.head.x, pin.head.y);
  pop();

  // Draw pinhead
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(pin.head.x, pin.head.y, pin.head.size);
  pop();
}

function displayOverlay() {
// Overlays mirrored video on canvas
  push();
  tint(255, 50);
  translate(width,0);
  scale(-1.0,1.0);
  image(video, 0, 0);
  pop();

  displayPops();
}

function displayPops() {
// Displays number of pops and changes colour with the bubble
  push();
  textSize(height/2);
  textAlign(CENTER, CENTER)
  fill(bubble.red, 100, 200, 150);
  text(pops, width/2, height/2);
  pop();
}
