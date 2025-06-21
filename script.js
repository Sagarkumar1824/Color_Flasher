let colors = ["red", "blue", "green", "yellow"];
let currentColor = "";
let score = 0;
let streak = 0;
let timeLeft = 3;
let gameInterval;
let timerInterval;

const statusText = document.getElementById("status");
const scoreDisplay = document.getElementById("score");
const buttons = document.querySelectorAll(".color-btn");
const restartBtn = document.getElementById("restartBtn");
const sounds = {
  red: new Audio("sounds/red.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  green: new Audio("sounds/green.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  orange: new Audio("sounds/orange.mp3"),
  pink: new Audio("sounds/pink.mp3"),
  cyan: new Audio("sounds/cyan.mp3"),
  violet: new Audio("sounds/violet.mp3"),
  success: new Audio("sounds/success.mp3"),
  fail: new Audio("sounds/fail.mp3")
};

// 🟨 Show random color
function flashColor() {
  currentColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = currentColor;
  statusText.innerText = `Time Left: ${timeLeft}s`;
}

// ⏱️ Start color + timer loop
function startGame() {
  score = 0;
  streak = 0;
  timeLeft = 3;
  scoreDisplay.innerText = `0`;

  flashColor();
  startTimer();

  gameInterval = setInterval(() => {
    timeLeft = 3;
    flashColor();
  }, 3000);
}

// 🔁 Start countdown
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    statusText.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      gameOver("⏱️ Time's up!");
    }
  }, 1000);
}

// 🛑 Stop game
function gameOver(message) {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  statusText.innerText = `${message} Final Score: ${score}, Streak: ${streak}`;
  document.body.style.backgroundColor = "black";

  restartBtn.style.display = "inline-block"; // Show the restart button
}

// 🎯 Check user click
function handleClick(e) {
  const selected = e.target.getAttribute("data-color");
  if (selected === currentColor) {
    score++;
    streak++;
    timeLeft = 3;
    scoreDisplay.innerText = `${score}`;

    // speed up game every 3 correct answers
    if (score % 3 === 0) {
      clearInterval(gameInterval);
      let newSpeed = Math.max(1000, 3000 - score * 100);
      gameInterval = setInterval(() => {
        timeLeft = 3;
        flashColor();
      }, newSpeed);
    }

    statusText.innerText = `✅ Correct! Streak: ${streak}`;
  } else {
    gameOver("❌ Wrong Color!");
  }
}

// 🎮 Setup
buttons.forEach(btn => btn.addEventListener("click", handleClick));
startGame();
function restartGame() {
  restartBtn.style.display = "none"; // Hide the button
  startGame(); // Restart logic
}

restartBtn.addEventListener("click", restartGame);
