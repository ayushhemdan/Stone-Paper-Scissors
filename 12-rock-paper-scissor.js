let scores = JSON.parse(localStorage.getItem('scores')) || {
  wins: 0,
  losses: 0,
  ties: 0

};

updateScoreElement();


function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';//kepp variables inside the scope if it's possible.Scope can help us prevent nameing conflicts.

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';

  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';

  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
  //return; undefined 
}

isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if(!isAutoPlaying){
  // document.querySelector('.auto-play-button').innerHTML = 'Stop';
  intervalId = setInterval( () => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
}else{
  clearInterval(intervalId);
  isAutoPlaying = false;

}

}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key ==='s'){
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (computerMove === playerMove) {
    result = 'Tie.';
  } else if (computerMove === 'paper' && playerMove === 'scissors') {
    result = 'You win.';
  } else if (computerMove === 'paper' && playerMove === 'rock') {
    result = 'You loss.';
  } else if (computerMove === 'rock' && playerMove === 'scissors') {
    result = 'You loss.';
  } else if (computerMove === 'scissors' && playerMove === 'rock') {
    result = 'You win.';
  } else if (computerMove === 'rock' && playerMove === 'paper') {
    result = 'You win.';
  } else if (computerMove === 'scissors' && playerMove === 'paper') {
    result = 'You loss.';
  }
  if (result === 'You win.') {
    scores.wins++;
  } else if (result === 'You loss.') {
    scores.losses++;
  } else {
    scores.ties++;
  }

  //localStorage build in object.
  //save values more permanently.

  localStorage.setItem('scores', JSON.stringify(scores));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `  You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer.`;

  //       alert(`You picked ${playerMove}.Computer picked ${computerMove}.${result}
  // Wins: ${scores.wins}, Losses: ${scores.losses}, Tie: ${scores.ties}`);
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${scores.wins}, Losses: ${scores.losses}, Tie: ${scores.ties}`;



}