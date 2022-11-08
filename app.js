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

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseX;
let mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.x;
  mouseY = e.y;
});
window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "rgba(255,255,255,0.3)";
    c.fill();
  }
  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouseX - this.x < 50 &&
      mouseX - this.x > -50 &&
      mouseY - this.y < 50 &&
      mouseY - this.y > -50
    ) {
      this.draw();
      c.fillStyle = "rgba(255,255,255,1)";
      c.fill();
    }

    this.draw();
  }
}
const circleArray = [];
for (let i = 0; i < 200; i++) {
  let radius = 2;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 2;

  let dy = (Math.random() - 0.5) * 2;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();

rulesBtn.addEventListener("click", (e) => {
  rules.classList.add("toggle");
});

startBtn.addEventListener("click", (e) => {
  startBtn.innerText = "STOP";
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

function refreshPage() {
  window.location.reload();
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
  setTimeout(refreshPage, 3000);
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
