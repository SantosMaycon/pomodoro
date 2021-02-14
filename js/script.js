/* Config ( Work Pause ) Time and Session 🡇 */

const workUp = document.querySelector("#work-up");
const workDown = document.querySelector("#work-down");
const workLabel = document.querySelector("#work");

workUp.addEventListener("click", () => {
  if (workLabel.innerText > 0 && workLabel.innerText < 60)
    workLabel.innerText = Number(workLabel.innerText) + 1;
});

workDown.addEventListener("click", () => {
  if (workLabel.innerText > 1)
    workLabel.innerText = Number(workLabel.innerText) - 1;
});

const pauseUp = document.querySelector("#pause-up");
const pauseDown = document.querySelector("#pause-down");
const pauseLabel = document.querySelector("#pause");

pauseUp.addEventListener("click", () => {
  if (pauseLabel.innerText > 0 && pauseLabel.innerText < 30)
    pauseLabel.innerText = Number(pauseLabel.innerText) + 1;
});

pauseDown.addEventListener("click", () => {
  if (pauseLabel.innerText > 1)
    pauseLabel.innerText = Number(pauseLabel.innerText) - 1;
});

const sessionUp = document.querySelector("#session-up");
const sessionDown = document.querySelector("#session-down");
const sessionLabel = document.querySelector("#session");

sessionUp.addEventListener("click", () => {
  if (sessionLabel.innerText > 0 && sessionLabel.innerText < 10)
    sessionLabel.innerText = Number(sessionLabel.innerText) + 1;
});

sessionDown.addEventListener("click", () => {
  if (sessionLabel.innerText > 2)
    sessionLabel.innerText = Number(sessionLabel.innerText) - 1;
});

/* Get Time 🡇 */

const timeLabel = document.querySelector("#time");
let cronometro;
let time;

/* Navegation 🡇 */

const btnContinue = document.querySelector("#continue");
const btnInicio = document.querySelector("#inicio");
const home = document.querySelector("#home");
const pomodoro = document.querySelector("#pomodoro");

btnContinue.addEventListener("click", () => {
  home.style.display = "none";
  pomodoro.style.display = "block";
  time = Number(workLabel.innerText);
  timeLabel.innerText =
    workLabel.innerText < 10
      ? "0" + workLabel.innerText.replace(/\s/g, "") + ":00"
      : workLabel.innerText.replace(/\s/g, "") + ":00";
});

btnInicio.addEventListener("click", () => {
  home.style.display = "flex";
  pomodoro.style.display = "none";
  icone.classList = "icone-triangle";
  time = 0;
  currentSecond = 0;
  currentMinute = null;
  ok = null;
  clearInterval(cronometro);
});

/* Play Time 🡇 */

const action = document.querySelector("#action");
const icone = action.querySelector("span");
let currentMinute;
let currentSecond = 0;
let formatTimeLabel;
let ok;

action.addEventListener("click", () => {
  if (!ok) {
    ok = "ok";
    currentMinute = time;
  }

  if (icone.className === "icone-triangle") {
    icone.className = "icone-pause";
    cronometro = setInterval(() => {
      currentSecond--;
      if (currentSecond < 0) {
        if (currentMinute > 0) {
          currentMinute--;
          currentSecond = 59;
        }
      }

      if (currentMinute === 0 && currentSecond === 0) {
        clearInterval(cronometro);
        icone.className = "icone-triangle";
        ok = null;
      }

      formatTimeLabel =
        (currentMinute < 10 ? `0${currentMinute}` : currentMinute) +
        ":" +
        (currentSecond < 10 ? `0${currentSecond}` : currentSecond);

      timeLabel.innerText = formatTimeLabel;
    }, 1000);
  } else if (icone.className === "icone-pause") {
    icone.className = "icone-triangle";
    clearInterval(cronometro);
  }
});
