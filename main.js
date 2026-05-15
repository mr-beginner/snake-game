const canvas = document.getElementById("game");

const gridSize = 20;

let tileCountX;
let tileCountY;

if (window.innerWidth < 600) {
  tileCountX = 18;
  tileCountY = 18;
} else {
  tileCountX = 25;
  tileCountY = 25;
}

canvas.width = tileCountX * gridSize;
canvas.height = tileCountY * gridSize;

const ctx = canvas.getContext("2d")
const scoreText = document.getElementById("score");

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
let speed =220;

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

function setDirection(newDx, newDy) {
  if (newDx === -dx && newDy === -dy) {
    return;
  }

  dx = newDx;
  dy = newDy;
}

function setDifficulty(level) {
  if (level === "easy") {
    speed = 300;
  } else if (level === "normal") {
    speed = 220;
  } else if (level === "hard") {
    speed = 140;
  }
  resetGame();
}

function gameLoop() {
  if (gameOver) {

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font ="40px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText(
      "GAME OVER",
       canvas.width / 2,
       canvas.height / 2 - 20
      );

      ctx.font = "24px sans-serif";

      ctx.fillText(
        "Score :" + score,
        canvas.width / 2,
        canvas.height / 2 +25
      )

    return;
  }

  moveSnake();

  if (checkCollision()) {
    gameOver = true;
  }

  drawGame();

  setTimeout(gameLoop, speed);
}

function moveSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    
    placeFood();
  } else {
    snake.pop();
  }
}
/////////////////////////////////////////
function drawGame() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSnake();
  drawApple();
}

function drawSnake() {
  for (let i = snake.length - 1; i >= 0; i--) {
    const part = snake[i];

    const centerX = part.x * gridSize + gridSize / 2;
    const centerY = part.y * gridSize + gridSize / 2;

    if (i === 0) {
      ctx.fillStyle = "#1e7d3b";
    } else {
      ctx.fillStyle = "#58c765";
    }

    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      gridSize / 2 -1,
      0,
      Math.PI * 2
    );
    ctx.fill();

    if (i === 0) {
      drawSnakeFace(part);
    }
  }
}

function drawSnakeFace(head) {
  const baseX = head.x * gridSize;
  const baseY = head.y * gridSize;

  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.arc(baseX + 6, baseY + 7, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(baseX + 14, baseY + 7, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "black";

  ctx.beginPath();
  ctx.arc(baseX + 6, baseY + 7, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(baseX + 14, baseY + 7, 1.5, 0, Math.PI * 2);
  ctx.fill();

  //赤い口
  ctx.fillStyle = "red";
  ctx.fillRect(baseX + 8, baseY + 13, 4, 5);
}

function drawApple() {
  const centerX = food.x * gridSize + gridSize / 2;
  const centerY = food.y * gridSize + gridSize / 2;

  //りんご本体
  ctx.fillStyle ="#e53935";
  ctx.beginPath();
  ctx.arc(centerX, centerY, gridSize / 2 - 2, 0, Math.PI * 2);
  ctx.fill();

  //ツヤ
  ctx.fillStyle = "#ff8a80";
  ctx.beginPath();
  ctx.arc(centerX - 3, centerY - 4, 2, 0, Math.PI * 2);
  ctx.fill();

  //葉っぱ
  ctx.fillStyle = "#43a047";
  ctx.fillRect(centerX +2, centerY - 12, 5, 5);
}


////////////////////////////////////////////////////

function placeFood() {
  food.x = Math.floor(Math.random() * tileCountX);
  food.y = Math.floor(Math.random() * tileCountY);
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= tileCountX ||
    head.y < 0 ||
    head.y >= tileCountY
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
  

  gameLoop();
}

gameLoop();
