"use strict";

/**
Character Generator
Darcy Harun w/ the help of Pippin Barr :)

Generates characteristics for a named character, typed by the user
*/

let characterProfile = {
  name: `--`,
  companion: `--`,
  setting: `--`,
  artifact: `--`,
  sign: `--`,
  spirit: `--`,
  attribute: `--`
};

let artifactData = undefined;
let descriptionsData = undefined;
let settingData = undefined;
let tolkienData = undefined;
let zodiacData = undefined;

let r = 0;

let state = `title`;

/**
Description of preload
*/
function preload() {

  artifactData = loadJSON(`assets/data/artifact.json`);
  descriptionsData = loadJSON(`assets/data/descriptions.json`);
  settingData = loadJSON(`assets/data/setting.json`);
  tolkienData = loadJSON(`assets/data/tolkienCharacterNames.json`);
  zodiacData = loadJSON(`assets/data/zodiac.json`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  let data = JSON.parse(localStorage.getItem(`character-profile-data`));

  characterProfile.name = data.name;
  characterProfile.companion = data.companion;
  characterProfile.setting = data.setting;
  characterProfile.artifact = data.artifact;
  characterProfile.sign = data.sign;
  characterProfile.spirit = data.spirit;
  characterProfile.attribute = data.attribute;

}

function generateCharacterProfile() {

  characterProfile.name = prompt(`What is your character's name?`);
  localStorage.setItem(`character-profile-data`,JSON.stringify(characterProfile));
}

function regenerateCharacterProfile() {

  characterProfile.companion = random(tolkienData.names);
  let place = random(settingData.settings);
  characterProfile.setting = place.name;
  let artifact = random(artifactData.artifacts);
  characterProfile.artifact = artifact.name;
  characterProfile.sign = random(zodiacData.signs);
  characterProfile.spirit = random(zodiacData.spirit);
  characterProfile.attribute = random(descriptionsData.descriptions);

  localStorage.setItem(`character-profile-data`,JSON.stringify(characterProfile));
}

/**
Description of draw()
*/
function draw() {
  background(255);

  if (state === `generate`) {
    generate();
  }
  else if (state === `title`) {
    displayLines();
    title();
  }
}

function title() {
  let titleText = `Character
Generator`;

  push();
  textFont(`Gothic`);
  textSize(48);
  textAlign(CENTER, CENTER);
  fill(0);
  text(titleText, width/2, height/2);
  pop();

  push();
  textFont(`Gothic`);
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(0);
  text(`*click to start`, width/2, height/1.1);
  pop();
}

function generate() {
  let profile = `未 CHARACTER DESCRIPTION 辰

name ✮ ${characterProfile.name}
companion ✧ ${characterProfile.companion}
starting setting ✬ ${characterProfile.setting}
artifact ✺ ${characterProfile.artifact}
sign: ❈ ${characterProfile.sign}
spirit ✣ ${characterProfile.spirit}
attribute ✹ ${characterProfile.attribute}`;

  displayLines();
  displayInstructions();

  push();
  textFont(`Gothic, Segoe UI`);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text(profile, width/2, height/2);
  pop();

  if (keyIsPressed === true) {
    regenerateCharacterProfile();
  }
}

function displayInstructions() {
  let instructionsText = `*click to type a name
  *press any key to generate characteristics`

  push();
  textFont(`Gothic`);
  textSize(18);
  textAlign(CENTER, CENTER);
  fill(0);
  text(instructionsText, width/2, height/1.1);
  pop();
}

function displayLines() {
  r = r + 0.1;

  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(r);
  line(-width, 0, width, 0);
  pop();

  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(r + 90);
  line(-width, 0, width, 0);
  pop();

  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(r + 45);
  line(-width, 0, width, 0);
  pop();

  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(r + (-45));
  line(-width, 0, width, 0);
  pop();

  push();
  fill(255);
  noStroke();
  ellipse(width/2, height/2, height/2, height/2);
  pop();
}

function mousePressed() {

  if (state === `title`) {
    state = `generate`;
  }
  else if (state === `generate`) {
    generateCharacterProfile();
  }
}
