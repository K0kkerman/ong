const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball properties
const ballRadius = 5;
const ballColor = '#5f2b9f';

// Create an array of balls
const balls = [];
const numBalls = 500;

for (let i = 0; i < numBalls; i++) {
  const ball = {
    x: Math.random() * (canvas.width - ballRadius * 2) + ballRadius,
    y: Math.random() * (canvas.height - ballRadius * 2) + ballRadius,
    dx: (Math.random() - 0.5) * 5, // Random horizontal velocity
    dy: (Math.random() - 0.5) * 5, // Random vertical velocity
  };

  balls.push(ball);
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function updateBall(ball) {
  // Apply gravity
  const gravity = 0.0;
  ball.dy += gravity;

  // Update ball position
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Handle ball collisions with the canvas edges
  if (ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) {
    ball.dx *= -1; // Reverse horizontal direction
  }

  if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
    ball.dy *= -1; // Reverse vertical direction
  }
}

function checkBallCollision(ballA, ballB) {
  const dx = ballB.x - ballA.x;
  const dy = ballB.y - ballA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 2 * ballRadius) {
    // Calculate unit normal vector
    const normalX = dx / distance;
    const normalY = dy / distance;

    // Calculate relative velocity
    const relativeVelocityX = ballB.dx - ballA.dx;
    const relativeVelocityY = ballB.dy - ballA.dy;

    // Calculate dot product
    const dotProduct = relativeVelocityX * normalX + relativeVelocityY * normalY;

    // Apply elastic collision
    const impulseX = (2 * dotProduct * normalX) / 2;
    const impulseY = (2 * dotProduct * normalY) / 2;

    ballA.dx += impulseX;
    ballA.dy += impulseY;
    ballB.dx -= impulseX;
    ballB.dy -= impulseY;
  }
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update each ball
  balls.forEach(ball => {
    drawBall(ball);
    updateBall(ball);

    // Check for collisions with other balls
    balls.forEach(otherBall => {
      if (ball !== otherBall) {
        checkBallCollision(ball, otherBall);
      }
    });
  });

  // Request animation frame
  requestAnimationFrame(draw);
}

// Start the animation
draw();