const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

$('.btn').on('click', function(e) {
  let userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern, gamePattern);
});

$(document).on('keydown', function() {
  if (start === false) {
    $('#level-title').text('Level 0');
    nextSequence();
  } else {
    return;
  }
});

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $(`#${randomChosenColor}`)
    .fadeOut(100)
    .fadeIn(100);
  level++;
  $('#level-title').text(`Level ${level}`);
  start = true;
}

function playSound(name) {
  switch (name) {
    case 'blue':
      let blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case 'green':
      let green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case 'red':
      let red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case 'yellow':
      let yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    case 'wrong':
      let wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
  }
}
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(function() {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}
function checkAnswer(arr1, arr2) {
  if (userClickedPattern[level - 1] === gamePattern[level - 1]) {
    console.log('Continued');
  } else if (arr1.length !== arr2.length) {
    console.log(`Let 'em pick`);
  }
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      $(`#level-title`).text('Game Over, Press Any Key To Restart');
      $('body').addClass('game-over');
      playSound('wrong');
      start = false;
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      setTimeout(function() {
        $('body').removeClass('game-over');
      }, 2000);
    }
  }
  if (arr1.length === arr2.length) {
    console.log('you good');
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
