/* View representation. */
const digitalUi = {
  hour: document.querySelector('.digital > .hour'),
  minute: document.querySelector('.digital > .minute'),
  second: document.querySelector('.digital > .second'),
  milisecond: document.querySelector('.digital > .milisecond'),
}

/* Current state of the app. */
const currentTime = {
  hour: 0,
  minute: 0,
  second: 0,
  milisecond: 0
}

/* Update state. */
function getTime(){
  const now = new Date();

  currentTime.hour = now.getHours();
  currentTime.minute = now.getMinutes();
  currentTime.second = now.getSeconds();
  currentTime.milisecond = now.getMilliseconds();
}

/* View utility */
function formatTime(value){
  return value < 10 ? `0${value}` : value.toString();
}

/* Show state in the app. */
function displayTime(){
  digitalUi.hour.textContent = formatTime(currentTime.hour);
  digitalUi.minute.textContent = formatTime(currentTime.minute);
  digitalUi.second.textContent = formatTime(currentTime.second);
  digitalUi.milisecond.textContent = formatTime(currentTime.milisecond);
}

/* Complete app. */
function app(){
  getTime();
  displayTime();
  setTimeout(app, 10);
}

/* Properly wait until whole page is loaded. */
window.addEventListener('DOMContentLoaded', app);
