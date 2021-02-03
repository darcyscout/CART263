"use strict";

/*****************
Slamina
Pippin Barr
A guessing game in which the page pronounces the name of an animal
backwards and the user has to figure out what it was and say the
name forwards.
******************/

// An array of animal names from
// https://github.com/dariusk/corpora/blob/master/data/animals/common.json
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

const QUESTION_DELAY = 2000; // in milliseconds

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;

let dingSFX;
let nopeSFX;

let playSFX = false;
let correct = false;

let lives = 3;

let rightAnswers = 0;

let string = `${lives} lives`

let state = `title`

function preload() {
  dingSFX = loadSound(`assets/sounds/DING.mp3`);
  nopeSFX = loadSound(`assets/sounds/NOPE.mp3`);
}

/*
Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      'I think it is *animal': guessAnimal
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }

  // Text defaults
  textSize(102);
  textStyle(BOLD);
  textAlign(CENTER);
}


/**
Display the current answer.
 */
function draw() {
  background(0);

  if (state === `title`) {
    displayTitle();
    displayAnswer();
  }
  else if (state === `play`) {
    displayAnswer();
    displayInstructions();
    displayLives();
  }
  else if (state === `end`) {
    displayEnd();
  }
}

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/

function displayTitle() {
  push();
  fill(240,220,20);
  text(`Slamina`, width/2 + random(-5,5), height/3 + random(-5,5));
  pop();
}

function displayInstructions() {
  push();
  textSize(15);
  fill(100,255,100);
  text(`I think it is... (your guess)`, width/2, height/9);
  pop();
}

function displayLives() {
  push();
  textSize(15);
  fill(100,255,100);
  text(string, width/9, height/2);
  pop();

  if (lives < 1) {
    state = `end`;
  }
}

function displayAnswer() {

  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
    correct = true;
    soundEffect();
  }
  else {
    fill(255, 0, 0);
    correct = false;
    soundEffect();
  }
  text(currentAnswer, width / 2, height / 2);
}

function displayEnd() {
  push();
  fill(240,220,20);
  text(`animalS`, width/2 + random(-5,5), height/3 + random(-5,5));
  pop();

  string = `${rightAnswers} correct answers`

  push();
  textSize(15);
  fill(100,255,100);
  text(string, width/2, height/2);
  pop();
}

/**
Plays sound appropriate to whether or not the correct answer is said.
*/
function soundEffect() {
  if (playSFX === true) {
    if (correct === true) {
      dingSFX.play();
      rightAnswers += 1;
      playSFX = false;
    }
    else {
      nopeSFX.play();
      lives = lives - 1;
      string = `${lives} lives`
      playSFX = false;
    }
  }
}

/**
Reverse the animal name and say it with ResponsiveVoice
*/
function sayAnimalBackwards(animal) {
  let reverseAnimal = reverseString(animal);
  responsiveVoice.speak(reverseAnimal);
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

/**
Called by annyang when the user make a guess.
animal parameter contains the guess as a string.
Sets the answer text to the guess.
*/
function guessAnimal(animal) {
  // Convert the guess to lowercase to match the answer format
  currentAnswer = animal.toLowerCase();
  playSFX = true;
}

/**
Reset the answer text, get a new random animal, say its name
*/
function nextQuestion() {
  currentAnswer = ``;
  currentAnimal = random(animals);
  sayAnimalBackwards(currentAnimal);
}

/**
When the user clicks, go to the next question
*/
function mousePressed() {

  if (state === `title`) {
    state = `play`;
  }
  nextQuestion();
}
