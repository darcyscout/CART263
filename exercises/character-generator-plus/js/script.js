"use strict";

/**
Character Generator
Darcy Harun w/ the help of Pippin Barr :)

Generates a randomized spy profile for the user, and password protects it.
*/

let characterProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
  champion: `**RETARDED**`
};

// let characterProfile = {
//   name: `**REDACTED**`,
//   alias: `**REDACTED**`,
//   secretWeapon: `**REDACTED**`,
//   password: `**REDACTED**`,
//   champion: `**RETARDED**`
// };

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;
let championData = undefined;

/**
Description of preload
*/
function preload() {
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  championData = loadJSON(`assets/data/tolkienCharacterNames.json`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  let data = JSON.parse(localStorage.getItem(`character-profile-data`));
  if (data !== null) {
    let password = prompt (`Agent! What is your password`)
    if (password === data.password) {
      characterProfile.name = data.name;
      characterProfile.alias = data.alias;
      characterProfile.secretWeapon = data.secretWeapon;
      characterProfile.password = data.password;
      characterProfile.champion = data.champion;
    }



  }
  else {
    generateCharacterProfile();
  }
}

function generateCharacterProfile() {
  characterProfile.name = prompt(`Agent! What is your name?!`);
  let instrument = random(instrumentData.instruments);
  characterProfile.alias = `The ${instrument}`;
  characterProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  characterProfile.password = random(card.keywords);
  characterProfile.champion = random(championData.names);

  localStorage.setItem(`character-profile-data`,JSON.stringify(characterProfile));
}
/**
Description of draw()
*/
function draw() {
  background(255);

  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE! **

Name: ${characterProfile.name}
Alias: ${characterProfile.alias}
Secret Weapon: ${characterProfile.secretWeapon}
Password: ${characterProfile.password}
Champion: ${characterProfile.champion}`;

  push();
  textFont(`Gothic, Segoe UI`);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text(profile, width/2, height/2);
  pop();
}

function mousePressed() {
  generateCharacterProfile();
}
