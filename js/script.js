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

/* Navegation 🡇 */

const btnContinue = document.querySelector("#continue");
const btnInicio = document.querySelector("#inicio");
const home = document.querySelector("#home");
const pomodoro = document.querySelector("#pomodoro");

let interval;
let minute = +workLabel.innerText;
let second = 0;
let ok = true;
let qtd;
let end = true;

let statusWorking;

function screenPomodoro() {
  home.style.display = "none";
  pomodoro.style.display = "block";
  if (ok) {
    console.log("Nº de Sessões:", (qtd = addSessionList() * 2 - 1));
    ok = false;
  }
  statusWorking
    ? ((minute = +workLabel.innerText),
      workStyle(),
      setTimeInTheClock(+workLabel.innerText),
      addActivetedInLi())
    : ((minute = +pauseLabel.innerText),
      pauseStyle(),
      setTimeInTheClock(+pauseLabel.innerText));
  second = 0;
}

function screenHome() {
  home.style.display = "flex";
  pomodoro.style.display = "none";
  icone.className = "icone-triangle";
  document.title = "Pomodoro";
  removeSessionList();
  clearInterval(interval);
  minute = 0;
  second = 0;
  ok = true;
  end = true;
}

btnContinue.addEventListener("click", () => {
  statusWorking = true; //Não esta bonito isso aqui! Obs: Alterar isso depois
  screenPomodoro();
});
btnInicio.addEventListener("click", screenHome);

/* Set Time Config Work in Clock Time 🡇 */

function setTimeInTheClock(minute, second = 00) {
  const timeLabel = document.querySelector("#time");
  timeLabel.innerText =
    (minute < 10 ? `0${minute}` : minute) +
    ":" +
    (second < 10 ? `0${second}` : second);
  document.title = timeLabel.innerText + " | Pomodoro";
}

/* Play Clock 🡇 */
const action = document.querySelector("#action");
const icone = action.querySelector("span");

function clock() {
  if (qtd) {
    if (icone.className === "icone-triangle") {
      icone.className = "icone-pause";
      interval = setInterval(() => {
        second--;
        if (second < 0) {
          if (minute > 0) {
            minute--;
            second = 59;
          }
        }

        if (minute === 0 && second === 0) {
          icone.className = "icone-triangle";
          clearInterval(interval);
          playAlert();
          setTimeout(() => {
            statusWorking ? (statusWorking = false) : (statusWorking = true);
            qtd--;
            if (qtd === 0) {
              if (end) {
                qtd++;
                longPauseClock();
                end = false;
              }
            } else screenPomodoro();
          }, 50);
        }

        setTimeInTheClock(minute, second);
      }, 1000);
    } else if (icone.className === "icone-pause") {
      icone.className = "icone-triangle";
      clearInterval(interval);
    }
  }
}

action.addEventListener("click", clock);

/* Session 🡇 */

const ulSession = document.querySelector("#list-session");

function addSessionList() {
  const session = Number(sessionLabel.innerText);
  for (let i = 0; i < session; i++) {
    ulSession.appendChild(document.createElement("li"));
  }
  return session;
}

function removeSessionList() {
  ulSession.innerHTML = "";
}

/* Add Checked Session 🡇 */

function addActivetedInLi() {
  let uniq = true;
  const li = ulSession.querySelectorAll("li");
  li.forEach((li) => {
    if (uniq)
      if (li.className === "") {
        uniq = false;
        li.className = "actived";
      }
  });
}

/* Styles 🡇 */

function setStylePomodoro(titleText, titleClass, clockClass, styleClass) {
  const title = document.querySelector("#title-status");
  const clockHTML = document.querySelector("#clock");
  const li = ulSession.querySelectorAll("li");
  title.innerText = titleText;
  title.className = titleClass;
  clockHTML.className = clockClass;
  li.forEach((li) => {
    if (li.className) li.className = styleClass;
  });
}

function pauseStyle() {
  setStylePomodoro(
    "Pausa",
    "title-status-pause",
    "clock-pause",
    "actived-pause",
  );
}

function workStyle() {
  setStylePomodoro("Trabalho", "title-status", "clock", "actived");
}

/* Add Alert Sound 🡇 */
const audio = new Audio("assets/alert.mp3");

function playAlert() {
  audio.play();
}

/* Long Pause 🡇 */

function longPauseClock() {
  setStylePomodoro(
    "Pausa Final",
    "title-status-long-pause",
    "clock-long-pause",
    "actived-long-pause",
  );
  minute = +pauseLabel.innerText * +sessionLabel.innerText;
  setTimeInTheClock(minute);
}
