const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];

let food = {
    x: 5,
    y: 5
};

let dx = 1;
let dy = 0;

let score = 0;
let gameOver = false;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "Enter" && gameOver) {
    resetGame();
    return;
  }
  if (event.key === "ArrowUp" && dy !==1) {
    dx = 0;
    dy = -1;
  } else if (event.key === "ArrowDown" && dy !== -1) {
    dx = 0;
    dy = 1;
  } else if (event.key === "ArrowLeft" && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (event.key === "ArrowRight" && dx !== -1) {
    dx = 1;
    dy = 0;
  }
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font ="30px sans-serif";
    ctx.fillText("Game Over" , 120, 200);
    return;
  }

  moveSnake();

  if (checkCollision()) {
    gameOver = true;
  }

  drawGame();

  setTimeout(gameLoop, 220);
}

function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreText.textContent = "Score: " +score;
    placeFood();
  } else {
    snake.pop();
  }
}

function drawGame() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (let part of snake) {
    ctx.fillRect(
      part.x * gridSize,
      part.y * gridSize,
      gridSize - 2,
      gridSize -2
    );
  }

  ctx.fillStyle = "red";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize -2
  );
}

function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
    }
  }
  return false;
}

function resetGame() {
  snake = [
    { x: 10, y: 10 }
  ];

  food = {
    x: 5,
    y: 5
  };

  dx = 1;
  dy = 0;
  score = 0;
  gameOver = false;

  scoreText.textContent = "Score: 0";
  

  gameLoop();
}

gameLoop();
