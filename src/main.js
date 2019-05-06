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
  toggleVisibility(ui.minute, ui.showMinute.checked);
  toggleVisibility(ui.second, ui.showSecond.checked);
  toggleVisibility(ui.millisecond, ui.showMillisecond.checked);
  toggleFormat();
  bindEvents();

  return {
    render,
    toggle
  };
}

function clockfaceMode() {

  const ui = {
    container: document.querySelector('.clockface'),
    hour: document.querySelector('.clockface__hand--hour'),
    minute: document.querySelector('.clockface__hand--minute'),
    second: document.querySelector('.clockface__hand--second'),
    hourGraduation: document.querySelector('.clockface-graduation-hour'),
    secondGraduation: document.querySelector('.clockface-graduation-second'),
    secondGraduationOption: document.querySelector('.clockface-options__second-graduation'),
    hourGraduationOption: document.querySelector('.clockface-options__hour-graduation'),
    graduationHour: document.querySelector('.clockface-graduation-hour'),
    graduationSecond: document.querySelector('.clockface-graduation-second')
  };

  function bindEvents() {
    ui.secondGraduationOption.addEventListener('change', () => toggleVisibility(ui.secondGraduation, ui.secondGraduationOption.checked));
    ui.hourGraduationOption.addEventListener('change', () => toggleVisibility(ui.hourGraduation, ui.hourGraduationOption.checked));
  }

  function setupGraduations() {

    for (let i = 0; i < 60; i++){
      const el = document.createElement('div');

      el.className = 'clockface-graduation-second-item';
      el.style.transform = `rotate(${6 * i}deg)`;
      ui.graduationSecond.appendChild(el);
    }

    for (let i = 0; i < 12; i++){
      const el = document.createElement('div');

      el.className = 'clockface-graduation-hour-item';
      el.style.transform = `translate(-1em, -.5em) rotate(${30 * i + 300}deg) translate(4em) rotate(-${30 * i + 300}deg)`;
      ui.graduationHour.appendChild(el);
    }
  }


  function render(currentTime) {
    const hourAngle = (currentTime.hour / 12) * 360 +  (currentTime.minute / 60) * 30;
    const minuteAngle = (currentTime.minute / 60) * 360;
    const secondAngle = (currentTime.second / 60) * 360;

    ui.hour.style.transform = `rotate(${hourAngle}deg)`;
    ui.minute.style.transform = `rotate(${minuteAngle}deg)`;
    ui.second.style.transform = `rotate(${secondAngle}deg)`;
  }

  function toggle(isVisible){
    toggleVisibility(ui.container, isVisible);
  }

  setupGraduations();
  bindEvents();
  toggleVisibility(ui.secondGraduation, ui.secondGraduationOption.checked);
  toggleVisibility(ui.hourGraduation, ui.hourGraduationOption.checked);

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
