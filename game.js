//alert("test");

const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

let started = false;

function playSound(soundName) {
  let soundFileName = "sounds/" + soundName + ".mp3";
  let audio = new Audio(soundFileName);
  audio.play();
}

function animatePress(currentColor) {
  //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  //$("." + currentColor).addClass("pressed");

  $("." + currentColor).addClass("pressed");

  //remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  //console.log("userClickedPattern: " + userClickedPattern);
  //console.log("gamePattern: " + gamePattern);

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    // change to game-over class
    $("body").addClass("game-over");
    // after 200 msec remove the game-over class
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    // restart the game
    startOver();
  }
}

// restart the game
// reset the values of level, gamePattern and started variables.
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  // random number between 0-3
  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];

  console.log(randomChosenColor);

  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  // select the random chosen color and add animation to flash the button
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // play the sound according to the random color chosen
  playSound(randomChosenColor);
}

// detect user button click event and store it's pattern
$(".btn").on("click", function (event) {
  // this the button that was clicked
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);

  // log the user color array
  //console.log(userClickedPattern);
});

$(document).on("keydown", function () {
  if (!started) {
    //The h1 title starts out saying "Press A Key to Start", when the game has started change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
