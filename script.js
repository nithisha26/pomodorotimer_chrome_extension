// JavaScript code
let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24; // 25 minutes by default for work interval

// Function to add leading zero if needed
const appendZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

// Function to reset timer
const resetTimer = () => {
  pauseTimer();
  switch (active) {
    case "long":
      minCount = 9; // 10 minutes for long break
      break;
    case "short":
      minCount = 4; // 5 minutes for short break
      break;
    default:
      minCount = 24; // 25 minutes for work interval
      break;
  }
  count = 59; // Reset seconds
  time.textContent = `${minCount + 1}:00`;
};

// Function to remove focus from buttons
const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

// Event listeners for buttons
focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  active = "focus";
  resetTimer();
});

shortBreakButton.addEventListener("click", () => {
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  active = "short";
  resetTimer();
});

longBreakButton.addEventListener("click", () => {
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  active = "long";
  resetTimer();
});

pause.addEventListener("click", () => {
  pauseTimer();
});

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    set = setInterval(() => {
      count--;
      if (count < 0) {
        if (minCount > 0) {
          minCount--;
          count = 59;
        } else {
          clearInterval(set);
          paused = true;
          return;
        }
      }
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    }, 1000);
  }
});

reset.addEventListener("click", resetTimer);

// Function to pause timer
const pauseTimer = () => {
  clearInterval(set);
  paused = true;
};

// Initial setup
time.textContent = `${minCount + 1}:00`;
