/* utilities */
function formatTime(value) {
  return value < 10 ? `0${value}` : value.toString();
}

function toggleVisibility(elToToggle, checkboxEl){
  elToToggle.style.display = checkboxEl.checked ? '' : 'none';
}

/* Complete app, kept inside "main" function. */
function app() {

  /* View representation. */
  const digitalUi = {
    hour: document.querySelector('.digital > .display > .hour'),
    minute: document.querySelector('.digital > .display > .minute'),
    second: document.querySelector('.digital > .display > .second'),
    millisecond: document.querySelector('.digital > .display > .millisecond'),
    showMinute: document.querySelector('.digital > .options .minute'),
    showSecond: document.querySelector('.digital > .options .second'),
    showMillisecond: document.querySelector('.digital > .options .millisecond'),
  }

  function bindEvents(){
    digitalUi.showMinute.addEventListener('change', () => toggleVisibility(digitalUi.minute, digitalUi.showMinute))
    digitalUi.showSecond.addEventListener('change', () => toggleVisibility(digitalUi.second, digitalUi.showSecond))
    digitalUi.showMillisecond.addEventListener('change',() => toggleVisibility(digitalUi.millisecond, digitalUi.showMillisecond))
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


  /* Show state in the app. */
  function displayTime(currentTime) {
    digitalUi.hour.textContent = formatTime(currentTime.hour);
    digitalUi.minute.textContent = formatTime(currentTime.minute);
    digitalUi.second.textContent = formatTime(currentTime.second);
    digitalUi.millisecond.textContent = formatTime(currentTime.millisecond);
  }

  /* Actual app function. */
  function run() {
    const currentTime = getCurrentTime();

    displayTime(currentTime);

    /* Loop the app */
    setTimeout(run, 10);
  }

  /* Initial run. */
  toggleVisibility(digitalUi.minute, digitalUi.showMinute);
  toggleVisibility(digitalUi.second, digitalUi.showSecond);
  toggleVisibility(digitalUi.millisecond, digitalUi.showMillisecond);
  bindEvents();
  run();
}

/* Properly wait until whole page is loaded. */
window.addEventListener('DOMContentLoaded', app);
