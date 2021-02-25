"use strict";

/**
Project 1
Darcy Harun

Ship fighting scene from STAR WARS???
*/

let space = {
  stars: [],
  numStars: 20,
  spaceColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 50
  }
};

let star = {
  x: 50,
  y: 50,
  vx: 0,
  vy: 1,
  num: 10
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

function createStar() {
  let star = {
    x: random(0, width),
    y: random(0, height),
    size: 1.5,
    vx: 0,
    vy: 0
  };
  return star;
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
