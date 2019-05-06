/* Utilities */

function toggleVisibility(elToToggle, isVisible){
  elToToggle.style.display = isVisible ? '' : 'none';
}

function digitalMode() {

  const ui = {
    container: document.querySelector('.digital'),
    hour: document.querySelector('.digital-display__hour'),
    minute: document.querySelector('.digital-display__minute'),
    second: document.querySelector('.digital-display__second'),
    millisecond: document.querySelector('.digital-display__millisecond'),
    showMinute: document.querySelector('.digital-options__minute'),
    showSecond: document.querySelector('.digital-options__second'),
    showMillisecond: document.querySelector('.digital-options__millisecond'),
    formatAmPm: document.querySelector('.digital-format__am-pm'),
    formatFull: document.querySelector('.digital-format__full')
  };

  const state = {
    isAmPm: false
  };

  function toggleFormat() {
    state.isAmPm = ui.formatAmPm.checked;
  }

  function formatTime(value) {
    return value < 10 ? `0${value}` : value.toString();
  }

  function parseHour(currentHour, isAmPm) {
    return isAmPm ? currentHour % 12 : currentHour;
  }

  function bindEvents() {
    ui.showMinute.addEventListener('change', () => toggleVisibility(ui.minute, ui.showMinute.checked));
    ui.showSecond.addEventListener('change', () => toggleVisibility(ui.second, ui.showSecond.checked));
    ui.showMillisecond.addEventListener('change', () => toggleVisibility(ui.millisecond, ui.showMillisecond.checked));
    ui.formatAmPm.addEventListener('change', toggleFormat);
    ui.formatFull.addEventListener('change', toggleFormat);
  }


  function render(currentTime) {
    const parsedHour = parseHour(currentTime.hour, state.isAmPm);

    ui.hour.textContent = formatTime(parsedHour);
    ui.minute.textContent = formatTime(currentTime.minute);
    ui.second.textContent = formatTime(currentTime.second);
    ui.millisecond.textContent = formatTime(currentTime.millisecond);
  }

  function toggle(isVisible){
    toggleVisibility(ui.container, isVisible);
  }

  /* Initial setup. */
  toggleVisibility(ui.minute, ui.showMinute);
  toggleVisibility(ui.second, ui.showSecond);
  toggleVisibility(ui.millisecond, ui.showMillisecond);
  toggleFormat();
  bindEvents();

  return {
    render,
    toggle
  };
}

function clockfaceMode(){

  const ui = {
    container: document.querySelector('.clockface'),
    hour: document.querySelector('.clockface-display__hour'),
    minute: document.querySelector('.clockface-display__minute'),
    second: document.querySelector('.clockface-display__second'),
  };

  function render(currentTime) {
    const hourAngle = (currentTime.hour / 2 / 24) * 360;
    const minuteAngle = (currentTime.minute / 60) * 360;
    const secondAngle = (currentTime.second / 60) * 360;

    ui.hour.style.transform = `rotate(${hourAngle}deg)`;
    ui.minute.style.transform = `rotate(${minuteAngle}deg)`;
    ui.second.style.transform = `rotate(${secondAngle}deg)`;
  }

  function toggle(isVisible){
    toggleVisibility(ui.container, isVisible);
  }

  return {
    render,
    toggle
  };
}

/* Complete app, kept inside "main" function. */
function app() {

  /* View representation. */
  const ui = {
    digital: document.querySelector('.mode__digital'),
    clockface: document.querySelector('.mode__clockface'),
  };

  const digitalClock = digitalMode();
  const clockfaceClock = clockfaceMode();

  const state = {
    isDigital: false,
    isClockFace: false
  };

  function bindEvents() {
    ui.digital.addEventListener('change', setMode);
    ui.clockface.addEventListener('change', setMode);
  }

  /* Get current state */
  function getCurrentTime() {
    const now = new Date();

    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
      millisecond: now.getMilliseconds()
    };
  }

  function setMode() {
    state.isDigital = ui.digital.checked;
    state.isClockFace = ui.clockface.checked;

    digitalClock.toggle(state.isDigital);
    clockfaceClock.toggle(state.isClockFace);
  }

  /* Actual app function. */
  function run() {
    const currentTime = getCurrentTime();

    if (state.isDigital) {
      digitalClock.render(currentTime);
    }

    if (state.isClockFace) {
      clockfaceClock.render(currentTime);
    }

    /* Loop the app */
    setTimeout(run, 10);
  }

  /* Initial run. */
  setMode();
  bindEvents();
  run();
}

/* Properly wait until whole page is loaded. */
window.addEventListener('DOMContentLoaded', app);
