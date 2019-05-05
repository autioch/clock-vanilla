/* Utilities */

function formatTime(value) {
  return value < 10 ? `0${value}` : value.toString();
}

function toggleVisibility(elToToggle, checkboxEl){
  elToToggle.style.display = checkboxEl.checked ? '' : 'none';
}

function parseHour(currentHour, isAmPm) {
  return isAmPm ? currentHour % 12 : currentHour;
}

/* Complete app, kept inside "main" function. */
function app() {

  /* View representation. */
  const ui = {
    mode: {
      digital: document.querySelector('.mode__digital'),
      clockface: document.querySelector('.mode__clockface'),
    },
    digital: {
      container: document.querySelector('.digital'),
      hour: document.querySelector('.digital-display__hour'),
      minute: document.querySelector('.digital-display__minute'),
      second: document.querySelector('.digital-display__second'),
      millisecond: document.querySelector('.digital-display__millisecond'),
      showMinute: document.querySelector('.digital-options__minute'),
      showSecond: document.querySelector('.digital-options__second'),
      showMillisecond: document.querySelector('.digital-options__millisecond'),
      formatAmPm: document.querySelector('.digital-format__am-pm'),
      formatFull: document.querySelector('.digital-format__full'),
    },
    clockface: {
      container: document.querySelector('.clockface')
    }
  };

  const state = {
    isAmPm: false,
    isDigital: false,
    isClockFace: false
  };

  function bindEvents() {
    ui.mode.digital.addEventListener('change', setMode);
    ui.mode.clockface.addEventListener('change', setMode);
    ui.digital.showMinute.addEventListener('change', () => toggleVisibility(ui.digital.minute, ui.digital.showMinute));
    ui.digital.showSecond.addEventListener('change', () => toggleVisibility(ui.digital.second, ui.digital.showSecond));
    ui.digital.showMillisecond.addEventListener('change', () => toggleVisibility(ui.digital.millisecond, ui.digital.showMillisecond));
    ui.digital.formatAmPm.addEventListener('change', toggleFormat);
    ui.digital.formatFull.addEventListener('change', toggleFormat);
  }

  function toggleFormat() {
    state.isAmPm = ui.digital.formatAmPm.checked;
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
    state.isDigital = ui.mode.digital.checked;
    state.isClockFace = ui.mode.clockface.checked;

    toggleVisibility(ui.digital.container, ui.mode.digital);
    toggleVisibility(ui.clockface.container, ui.mode.clockface);
  }

  /* Show state in the app. */
  function displayDigitalTime(currentTime) {
    const parsedHour = parseHour(currentTime.hour, state.isAmPm);

    ui.digital.hour.textContent = formatTime(parsedHour);
    ui.digital.minute.textContent = formatTime(currentTime.minute);
    ui.digital.second.textContent = formatTime(currentTime.second);
    ui.digital.millisecond.textContent = formatTime(currentTime.millisecond);
  }

  /* Actual app function. */
  function run() {
    const currentTime = getCurrentTime();

    if (state.isDigital) {
      displayDigitalTime(currentTime);
    }

    /* Loop the app */
    setTimeout(run, 10);
  }

  /* Initial run. */
  toggleVisibility(ui.digital.minute, ui.digital.showMinute);
  toggleVisibility(ui.digital.second, ui.digital.showSecond);
  toggleVisibility(ui.digital.millisecond, ui.digital.showMillisecond);
  toggleFormat();
  setMode();
  bindEvents();
  run();
}

/* Properly wait until whole page is loaded. */
window.addEventListener('DOMContentLoaded', app);
