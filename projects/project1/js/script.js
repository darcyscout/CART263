"use strict";

/**
Project 1
Darcy Harun

Ship fighting scene from STAR WARS???
*/

let star = {
  x: 50,
  y: 50
};

let x = undefined;
let y = undefined;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  for (let i = 0; i < 20; i++) {
    
  }

}


/**
Description of draw()
*/
function draw() {
  background(0,50);

  strokeWeight(1.5);
  stroke(255);
  point(star.x, star.y);

}
