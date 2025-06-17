const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 80;
const paddleWidth = 10;
let paddleY = canvas.height / 2 - paddleHeight / 2;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 3;

let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") upPressed = true;
  if (e.key === "ArrowDown") downPressed = true;
});

document.addEventListener("keyup", function (e) {
  if (e.key === "ArrowUp") upPressed = false;
  if (e.key === "ArrowDown") downPressed = false;
});

function drawPaddle() {
  ctx.fillStyle = "lime";
  ctx.fillRect(10, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "lime";
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebater no topo e no fundo
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY *= -1;
  }

  // Rebater na raquete
  if (
    ballX - ballRadius < 20 &&
    ballY > paddleY &&
    ballY < paddleY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Game Over
  if (ballX - ballRadius < 0) {
    alert("Game Over! Recarregue a página para jogar novamente.");
    document.location.reload();
  }
}

function movePaddle() {
  if (upPressed && paddleY > 0) {
    paddleY -= 5;
  } else if (downPressed && paddleY < canvas.height - paddleHeight) {
    paddleY += 5;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  moveBall();
  movePaddle();
  requestAnimationFrame(draw);
}

draw();