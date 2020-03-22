var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameStarted = false;


//Testing what button was clicked and adding it to the users choice array to keep track of
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Sleep for x ms
// This returns an async promise that needs to
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//This function is used to play the click audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);

}
//This adds the background effect on click
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);


}
//This is used to generate a new random button
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
  level++;
}
//Checking for the initial keypress to active the game
$("body").keydown(function() {
  if (!isGameStarted) {
    nextSequence();
    isGameStarted = true;

  }

});
//Comparing the users entry vs the game generated array
async function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      userClickedPattern = [];

      await sleep(1000);
      await playPreviousPattern();
      nextSequence();
    }
  } else {
    playSound("wrong");
    $("h1").text("Game over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function() {;
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isGameStarted = false;
}

async function playPreviousPattern() {
  for(var i = 0; i < gamePattern.length; i ++) {
    animatePress(gamePattern[i]);
    playSound(gamePattern[i]);
    await sleep(500)
  }

}
