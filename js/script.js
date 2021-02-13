const btnContinue = document.querySelector("#continue");
const btnInicio = document.querySelector("#inicio");
const home = document.querySelector("#home");
const pomodoro = document.querySelector("#pomodoro");

btnContinue.addEventListener("click", () => {
  home.style.display = "none";
  pomodoro.style.display = "block";
});

btnInicio.addEventListener("click", () => {
  home.style.display = "flex";
  pomodoro.style.display = "none";
});
