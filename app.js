const gameTile = document.querySelectorAll(".game-tile");
const startBtn = document.querySelector(".start-btn");
const tileArray = Array.from(gameTile);
console.log(tileArray);
choice1 = "blue";
Choice2 = "red";
choice3 = "green";
choice4 = "yellow";
choice5 = "pink";
gameOverChoice = "black";
let gameplay = false;

startBtn.addEventListener("click", (e) => {
  startBtn.innerText = "||";
  if (gameplay === true) {
    gameplay = false;
    startBtn.innerText = "START";
  } else {
    gameplay = true;
    startGame();
  }
});

function randomColorFunction() {
  const colors = ["blue", "red", "green", "yellow", "pink", "black"];
  const randomcolor = colors[Math.floor(Math.random() * colors.length)];
  return randomcolor;
}

function startGame(e) {
  if (gameplay === true) {
    tileArray.forEach((element) => {
      element.style.background = randomColorFunction();
    });
    setTimeout(startGame, 1500);
    gameLogic();
  }
}

function gameLogic() {
  tileArray.forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log("click");
      if (e.target.style.background === choice1) {
        console.log("yeah baby");
      }
    });
  });
}
