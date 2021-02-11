"use strict";

/**
Character Generator
Darcy Harun w/ the help of Pippin Barr :)

Generates a randomized spy profile for the user, and password protects it.
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

  generateCharacterProfile();

  // let data = JSON.parse(localStorage.getItem(`character-profile-data`));
  // if (data !== null) {
  //   let password = prompt (`Agent! What is your password`)
  //   if (password === data.password) {
  //     characterProfile.name = data.name;
  //     characterProfile.alias = data.alias;
  //     characterProfile.secretWeapon = data.secretWeapon;
  //     characterProfile.password = data.password;
  //     characterProfile.champion = data.champion;
  //   }
  //
  //
  //
  // }
  // else {
  //   generateCharacterProfile();
  // }
}

function generateCharacterProfile() {

  characterProfile.name = prompt(`What is your name?`);
  characterProfile.companion = random(tolkienData.names);
  let place = random(settingData.settings);
  characterProfile.setting = place.name;
  let artifact = random(artifactData.artifacts);
  characterProfile.artifact = artifact.name;
  characterProfile.sign = random(zodiacData.signs);
  characterProfile.spirit = random(zodiacData.spirit);
  characterProfile.attribute = random(descriptionsData.descriptions);

  // characterProfile.name = prompt(`Agent! What is your name?!`);
  // let instrument = random(instrumentData.instruments);
  // characterProfile.alias = `The ${instrument}`;
  // characterProfile.secretWeapon = random(objectData.objects);
  // let card = random(tarotData.tarot_interpretations);
  // characterProfile.password = random(card.keywords);
  // characterProfile.champion = random(championData.names);

  // localStorage.setItem(`character-profile-data`,JSON.stringify(characterProfile));
}

/**
Description of draw()
*/
function draw() {
  background(255);

  let profile = `未 CHARACTER DESCRIPTION 辰

name ✮ ${characterProfile.name}
companion ✧ ${characterProfile.companion}
starting setting ✬ ${characterProfile.setting}
artifact ✺ ${characterProfile.artifact}
sign: ❈ ${characterProfile.sign}
spirit ✣ ${characterProfile.spirit}
attribute ✹ ${characterProfile.attribute}`;

  displayLines();

  push();
  fill(255);
  noStroke();
  ellipse(width/2, height/2, height/2, height/2);
  pop();

  push();
  textFont(`Gothic, Segoe UI`);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text(profile, width/2, height/2);
  pop();

}

function displayLines() {
  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(0);
  line(-width, 0, width, 0);
  pop();

  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(90);
  line(-width, 0, width, 0);
  pop();

  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(45);
  line(-width, 0, width, 0);
  pop();

  push();
  stroke(0,25);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(-45);
  line(-width, 0, width, 0);
  pop();
}

function mousePressed() {
  generateCharacterProfile();
}
