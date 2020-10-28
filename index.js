/*  ========================================================
 *  Constants
 *  ======================================================== */

// Canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

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

// Bricks
const bricks = [];

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

/*  ========================================================
 *  Variables
 *  ======================================================== */

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;

let lives = 3;

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
      bricks[c][r] = { x: brickX, y: brickY, status: 3 };
    }
  }
}

// Handlers
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
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
          x > b.x
          && x < b.x + brickWidth
          && y > b.y
          && y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status -= 1;
          score += 1;
          if (score === brickRowCount * brickColumnCount * 3) {
            win();
          }
        }
      }
    }
  }
}

function checkWallCollision() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
}

function checkCeilFloorCollision() {
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        lose();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}

function checkMove() {
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

function moveBall() {
  x += dx;
  y += dy;
}

// Draw
function drawScore() {
  ctx.font = FONT;
  ctx.fillStyle = BLUE;
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = FONT;
  ctx.fillStyle = BLUE;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = BLUE;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = BLUE;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status > 0) {
        ctx.beginPath();
        ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        if (bricks[c][r].status === 3) {
          ctx.fillStyle = RED;
        } else if (bricks[c][r].status === 2) {
          ctx.fillStyle = YELLOW;
        } else {
          ctx.fillStyle = GREEN;
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();

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
