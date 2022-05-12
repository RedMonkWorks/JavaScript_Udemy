// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI Elements
minNum.textContent = min;
maxNum.textContent = max;

// Play Again EventListner
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else if (guess === winningNum) {
    // Disable Input
    guessInput.disabled = true;
    // Input Border Color
    guessInput.style.borderColor = "green";

    setMessage(`${guess} is correct!`, "green");

    playAgain();
  } else {
    guessesLeft--;
    guessInput.value = "";

    setMessage(`${guess} is Incorrect, ${guessesLeft} guesses left!`, "red");

    if (guessesLeft === 0) {
      guessInput.value = "";
      guessBtn.disabled = true;
      guessInput.disabled = true;
      guessBtn.style.borderColor = "red";

      setMessage(`${guess} is Incorrect, You Lose!`, "red");

      playAgain();
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function playAgain() {
  guessBtn.value = "Play Again";
  guessBtn.className = "play-again";
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(winningNum);
