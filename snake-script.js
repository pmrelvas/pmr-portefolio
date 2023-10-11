const NUM_LETTERS = 13;
const FOOD_LETTERS = [
  {
    letter: 'I',
    color: '#6ed5f4'
  },
  {
    letter: 'N',
    color: '#6ed5f4'
  },
  {
    letter: 'E',
    color: '#6ed5f4'
  },
  {
    letter: 'S',
    color: '#6ed5f4'
  },
  {
    letter: 'C',
    color: '#6ed5f4'
  },
  {
    letter: 'T',
    color: '#6ed5f4'
  },
  {
    letter: 'E',
    color: '#6ed5f4'
  },
  {
    letter: 'C',
    color: '#6ed5f4'
  },
  {
    letter: 'J',
    color: '#E38520'
  },
  {
    letter: 'U',
    color: '#E38520'
  },
  {
    letter: 'M',
    color: '#E38520'
  },
  {
    letter: 'I',
    color: '#E38520'
  },
  {
    letter: 'A',
    color: '#E38520'
  },
];
const SOLUTION_COLORS = [
  'white',
  '#E38520',
  '#ccc',
  'E3DA14',
  'white',
  '#E38520',
  '#ccc',
  'E3DA14'
];
const GameStatus = {
  IDLE: 0,
  RUNNING: 1,
  GAME_OVER: 2
};
const snakeCanvas = document.getElementById('snake-canvas');
const canvasContainerEl = document.getElementById("snake-canvas-container");
snakeCanvas.width = canvasContainerEl.offsetWidth;
snakeCanvas.height = canvasContainerEl.offsetHeight;
const ctx = snakeCanvas.getContext('2d');
const lblScore = document.getElementById('snake-score');
const btnReset = document.getElementById('btn-reset-snake-game');
const canvasWidth = Math.floor(snakeCanvas.getBoundingClientRect().width);
const canvasHeight = Math.floor(snakeCanvas.getBoundingClientRect().height);
const imgGameOver = document.getElementById('img-snake-game-over');
const boardBackground = '#2C80FF';
const snakeColor = 'white';
const snakeBorder = '#ccc';
const unitSize = 25;
const LEFT =  'a';
const RIGHT = 'd';
const UP = 'w';
const DOWN = 's';
let gameStatus = GameStatus.IDLE;
let vx = unitSize;
let vy = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener('keydown', onKeyDown);
btnReset.addEventListener('click', resetGame);

displayStartGame();

function displayStartGame() {
  ctx.font = '1.5rem Russo One';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText("Help the snake discover", canvasWidth / 2, canvasHeight / 2 - 120);
  ctx.fillText("the main companies I've worked on", canvasWidth / 2, canvasHeight / 2 - 60);
  ctx.fillText("Press any key to start...", canvasWidth / 2, canvasHeight / 2);
  ctx.fillText("Controls: a, s, d, w", canvasWidth / 2, canvasHeight / 2 + 60);
}

function startGame() {
  lblScore.textContent = score;
  gameStatus = GameStatus.RUNNING;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (gameStatus == GameStatus.RUNNING) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else if (gameStatus == GameStatus.GAME_OVER) {
    displayGameOver();
  }
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function createFood() {
  function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
  }

  foodX = randomFood(0, canvasWidth - unitSize);
  foodY = randomFood(0, canvasHeight - unitSize);
}

function drawFood() {
  const idx = score % NUM_LETTERS;
  ctx.fillStyle = FOOD_LETTERS[idx].color;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
  ctx.font = '22px Russo One';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText(FOOD_LETTERS[idx].letter, foodX + 12, foodY + 20);
}

function isFoodEaten() {
  return snake[0].x == foodX && snake[0].y == foodY;
}

function incrementScore() {
  score += 1;
  lblScore.textContent = score;
}

function displaySolutionLetter() {
  const letterEl = document.getElementById('snake-solution-item-' + String(score + 1).padStart(2, '0'));
  const idx = score % NUM_LETTERS;
  letterEl.textContent = FOOD_LETTERS[idx].letter;
  const colorIdx = Math.floor(score / NUM_LETTERS);
  letterEl.color = SOLUTION_COLORS[colorIdx];
}

function moveSnake() {
  const head = {
    x: snake[0].x + vx,
    y: snake[0].y + vy
  };
  snake.unshift(head);
  if (isFoodEaten()) {
    displaySolutionLetter();
    incrementScore();
    createFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function handleSnakeNavigation(event) {
  const goingUp = (vy == -unitSize);
  const goingDown = (vy == unitSize);
  const goingLeft = (vx == -unitSize);
  const goingRight = (vx == unitSize);

  if (event.key == LEFT && !goingRight) {
    vx = -unitSize;
    vy = 0;
  } else if (event.key == RIGHT && !goingLeft) {
    vx = unitSize;
    vy = 0;
  } else if (event.key == UP && !goingDown) {
    vx = 0;
    vy = -unitSize;
  } else if (event.key == DOWN && !goingUp) {
    vx = 0;
    vy = unitSize;
  }
}

function onKeyDown(event) {
  if (gameStatus == GameStatus.IDLE) {
    startGame();
  }

  handleSnakeNavigation(event);
}

function checkWallCollision() {
  return snake[0].x < 0
  || snake[0].x >= canvasWidth
  || snake[0].y < 0
  || snake[0].y >= canvasHeight;
}

function checkGameOver() {
  if (checkWallCollision()) {
    gameStatus = GameStatus.GAME_OVER;
  }
  for (let i = 1; i < snake.length; i+=1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      gameStatus = GameStatus.GAME_OVER;
      break;
    }
  }
}

function displayGameOver() {
  ctx.drawImage(imgGameOver, canvasWidth / 2 - 150, canvasHeight / 2 - 250, 300, 300);
  ctx.font = '3rem Russo One';
  ctx.fillStyle = '#ccc';
  ctx.textAlign = 'center';
  ctx.fillText("Game Over!", canvasWidth / 2, canvasHeight / 2 + 50);
  ctx.fillText("Nice Job!", canvasWidth / 2, canvasHeight / 2 + 100);
}

function resetGame() {
  vx = unitSize;
  vy = 0;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  startGame();
}