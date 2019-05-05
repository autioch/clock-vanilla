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
      digital: document.querySelector('.mode .mode__digital')
    },
    digital: {
      container: document.querySelector('.digital'),
      hour: document.querySelector('.digital > .display > .hour'),
      minute: document.querySelector('.digital > .display > .minute'),
      second: document.querySelector('.digital > .display > .second'),
      millisecond: document.querySelector('.digital > .display > .millisecond'),
      showMinute: document.querySelector('.digital > .options .minute'),
      showSecond: document.querySelector('.digital > .options .second'),
      showMillisecond: document.querySelector('.digital > .options .millisecond'),
      formatAmPm: document.querySelector('.digital > .options .format-am-pm'),
      formatFull: document.querySelector('.digital > .options .format-full'),
    }
  };

  const state = {
    isAmPm: false,
    isDigital: false
  };

  function bindEvents() {
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

    toggleVisibility(ui.digital.container, ui.mode.digital);
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
