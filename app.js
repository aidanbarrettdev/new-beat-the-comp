const gameTile = document.querySelectorAll(".game-tile");
const startBtn = document.querySelector(".start-btn");
const winBox = document.querySelector(".win-box");
const choiceBox = document.querySelector(".choice-box");
const pointsBox = document.querySelector(".points");
const timerBox = document.querySelector(".timer-box");
const colors = ["blue", "red", "green", "yellow", "pink", "black"];
const tileArray = Array.from(gameTile);

gameSpeedChoice = "black";
let gameplay = false;
let points = 0;
let timeLeft = 10;
let countdown;

startBtn.addEventListener("click", (e) => {
  startBtn.innerText = "||";
  if (gameplay === true) {
    gameOver();
  } else {
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
  }
});

function randomColorFunction() {
  const randomcolor = colors[Math.floor(Math.random() * colors.length)];

  return randomcolor;
}
let time = 4000;
function startGame(e) {
  if (gameplay === true) {
    tileArray.forEach((element) => {
      element.style.background = randomColorFunction();

      choiceBox.innerText = colors[Math.floor(Math.random() * colors.length)];
      choiceBox.style.background = choiceBox.innerText;
    });

    setTimeout(startGame, time);
  }
  gameLogic();
}

function gameLogic() {
  tileArray.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.style.background === choiceBox.innerText) {
        winBox.innerText = "Yeah!";
        points++;
        pointsBox.innerText = `points:${points}`;
        console.log(points);
        console.log("click");
        if (points >= 10) {
          gameWin();
        }
      } else if (e.target.style.background === gameSpeedChoice) {
        winBox.innerText = "Speeding Up!";
        setTimeout(startGame, time / 2);
      } else {
        gameOver();
      }
    });
  });
}

function gameOver() {
  clearInterval(countdown);
  points = 0;
  gameplay = false;
  winBox.innerText = "Try Again";
  startBtn.innerText = "START";

  timeLeft = 10;
}

function gameWin() {
  clearInterval(countdown);
  points = 0;
  gameplay = false;

  startBtn.innerText = "START";

  timeLeft = 10;
  winBox.innerText = "WINNER";
}
