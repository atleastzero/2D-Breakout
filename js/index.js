/* eslint-disable comma-dangle */
/* eslint-disable no-alert */
/* eslint-disable import/extensions */

/*  ========================================================
 *  Imports
 *  ======================================================== */

import ctx, { canvas } from './main.js';
import Ball from './Sprites/Ball.js';
import Brick from './Sprites/Brick.js';
import Lives from './Sprites/Lives.js';
import Paddle from './Sprites/Paddle.js';
import Score from './Sprites/Score.js';

/*  ========================================================
 *  Constants
 *  ======================================================== */

// Ball Info
const ballRadius = 10;

// Paddle Info
const paddleHeight = 10;
const paddleWidth = 75;

// Brick Info
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Messages
const WIN_MESSAGE = 'YOU WIN, CONGRATULATIONS!';
const LOSE_MESSAGE = 'GAME OVER';

// Controls
const RIGHT = 'Right';
const LEFT = 'Left';
const RIGHT_ARROW = 'ArrowRight';
const LEFT_ARROW = 'ArrowLeft';

// Style
const FONT = '16px Arial';
const BLUE = '#0095DD';
// Brick Style
const RED = 'red';
const YELLOW = 'yellow';
const GREEN = 'green';

// Bricks
const bricks = [];

// Ball
const ball = new Ball(ballRadius, BLUE, canvas.width / 2, canvas.height - 30);

// Paddle
const paddle = new Paddle(
  paddleWidth,
  paddleHeight,
  BLUE,
  (canvas.width - paddleWidth) / 2,
  (canvas.height - paddleHeight)
);

// Text
const lives = new Lives(FONT, BLUE);
const score = new Score(FONT, BLUE);

/*  ========================================================
 *  Variables
 *  ======================================================== */

let dx = 2;
let dy = -2;

let rightPressed = false;
let leftPressed = false;

/*  ========================================================
 *  Functions
 *  ======================================================== */

// Set up const bricks
function setUpBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r] = new Brick(brickWidth, brickHeight, RED, YELLOW, GREEN, brickX, brickY);
    }
  }
}

// Handlers
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === RIGHT || e.key === RIGHT_ARROW) {
    rightPressed = true;
  } else if (e.key === LEFT || e.key === LEFT_ARROW) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === RIGHT || e.key === RIGHT_ARROW) {
    rightPressed = false;
  } else if (e.key === LEFT || e.key === LEFT_ARROW) {
    leftPressed = false;
  }
}

// Game Results
function win() {
  alert(WIN_MESSAGE);
  document.location.reload();
}

function lose() {
  alert(LOSE_MESSAGE);
  document.location.reload();
}

// Misc. Game Logic
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status > 0) {
        if (
          ball.x > b.x
          && ball.x < b.x + brickWidth
          && ball.y > b.y
          && ball.y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status -= 1;
          score.increment();
          if (score === brickRowCount * brickColumnCount * 3) {
            win();
          }
        }
      }
    }
  }
}

function checkWallCollision() {
  if (ball.x + dx > canvas.width - ballRadius || ball.x + dx < ballRadius) {
    dx = -dx;
  }
}

function checkCeilFloorCollision() {
  if (ball.y + dy < ballRadius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ballRadius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      dy = -dy;
    } else {
      lives.decrement();
      if (!lives.left) {
        lose();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddle.x = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}

function checkMove() {
  if (rightPressed) {
    paddle.x += 7;
    if (paddle.x + paddleWidth > canvas.width) {
      paddle.x = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddle.x -= 7;
    if (paddle.x < 0) {
      paddle.x = 0;
    }
  }
}

function moveBall() {
  ball.x += dx;
  ball.y += dy;
}

// Draw
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = BLUE;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      bricks[c][r].render();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.render();
  drawPaddle();
  collisionDetection();
  score.render();
  lives.render();

  checkWallCollision();
  checkCeilFloorCollision();

  checkMove();

  moveBall();

  requestAnimationFrame(draw);
}

// Game
function initializeGame() {
  setUpBricks();

  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
  document.addEventListener('mousemove', mouseMoveHandler, false);

  draw();
}

/*  ========================================================
 *  Initialize
 *  ======================================================== */

initializeGame();
