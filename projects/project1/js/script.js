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

// let star = {
//   x: 50,
//   y: 50,
//   vx: 0,
//   vy: 1,
//   num: 10
// };

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

  for (let i = 0; i < space.numStars; i++) {
    let star = new Star();
    space.stars.push(star)
  }
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
  background(space.spaceColor.r, space.spaceColor.g, space.spaceColor.b, space.spaceColor.a);
  // console.log(check);

  for (let i = 0; i < space.stars.length; i++) {
    let star = space.stars[i];
    star.display();
    star.animate();
  }
}
