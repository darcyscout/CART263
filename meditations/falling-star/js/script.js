"use strict";

/**
Project 1
Darcy Harun

Ship fighting scene from STAR WARS???
*/

let star = {
  x: 50,
  y: 50,
  vx: 0,
  vy: 1
};

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

}


/**
Description of draw()
*/
function draw() {
  background(0,50);

  if (star.y > height) {
    star.y = 0;
    star.x = random(0,width);
  }

  star.x = star.x + star.vx;
  star.y = star.y + star.vy;

  strokeWeight(1.5);
  stroke(255);
  point(star.x, star.y);

}
