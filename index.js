// script.js
var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var keyPressed = false;

$(document).keypress(function (e) {
  if (!keyPressed) {
    keyPressed = true;
    nextSequence();
  }
});

function nextSequence() {
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomColor = colors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

$(".btn").click(function (e) {
  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  animatePress(this);
  playSound(userChosenColor);

  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  keyPressed = false;
}
