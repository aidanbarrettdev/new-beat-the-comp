const gameTile = document.querySelectorAll(".game-tile");
const rulesBtn = document.querySelector(".rules-btn");
const rules = document.querySelector(".rules");
const startBtn = document.querySelector(".start-btn");
const winBox = document.querySelector(".win-box");
const choiceBox = document.querySelector(".choice-box");
const pointsBox = document.querySelector(".points");
const timerBox = document.querySelector(".timer-box");
const colors = ["blue", "red", "green", "yellow", "pink", "black"];
const tileArray = Array.from(gameTile);
const selectionAudio = new Audio();
selectionAudio.src = "/imgs/selection.mp3";
const startgameAudio = new Audio();
startgameAudio.src = "/imgs/startgame.mp3";
const wingameAudio = new Audio();
wingameAudio.src = "/imgs/wingame.mp3";
const losegameAudio = new Audio();
losegameAudio.src = "/imgs/losegame.mp3";

gameSpeedChoice = "black";
let gameplay = false;
let points = 0;
let timeLeft = 15;
let countdown;

rulesBtn.addEventListener("click", (e) => {
  console.log("copy");
  rules.classList.add("toggle");
});

startBtn.addEventListener("click", (e) => {
  startBtn.innerText = "||";
  if (gameplay === true) {
    gameOver();
  } else {
    rules.classList.add("toggle");
    startgameAudio.play();
    gameplay = true;
    points = 0;
    pointsBox.innerHTML = points;
    countdown = setInterval(function () {
      --timeLeft;
      timerBox.innerText = timeLeft;
      if (timeLeft === 0) {
        gameOver();
      }
    }, 1000);

    startGame();
    gameLogic();
  }
});

function randomColorFunction() {
  const randomcolor = colors[Math.floor(Math.random() * colors.length)];

  return randomcolor;
}
let time = 1250;
function startGame() {
  if (gameplay === true) {
    tileArray.forEach((element) => {
      element.style.background = randomColorFunction();

      choiceBox.innerText = colors[Math.floor(Math.random() * colors.length)];
      choiceBox.style.background = choiceBox.innerText;
    });

    setTimeout(startGame, time);
  }
}

function gameLogic() {
  tileArray.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.style.background === choiceBox.innerText) {
        selectionAudio.play();
        winBox.innerText = "Yeah!";
        points++;
        pointsBox.innerText = `points:${points}`;

        if (points >= 10) {
          gameWin();
        }
      } else if (e.target.style.background === gameSpeedChoice) {
        selectionAudio.play();
        winBox.innerText = "Speeding Up!";
        setTimeout(startGame, time / 2);
      } else {
        gameOver();
      }
    });
  });
}

function gameOver() {
  losegameAudio.play();
  clearInterval(countdown);

  gameplay = false;
  winBox.innerText = "Try Again";
  startBtn.innerText = "START";

  timeLeft = 15;
  pointsBox.innerText = `Total: ${points}`;
  points = 0;
}

function gameWin() {
  wingameAudio.play();
  clearInterval(countdown);
  points = 0;
  gameplay = false;

  startBtn.innerText = "START";

  timeLeft = 15;
  winBox.innerText = "WINNER!";
}
