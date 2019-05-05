/* Complete app, kept inside "main" function. */
function app() {

  /* View representation. */
  const digitalUi = {
    hour: document.querySelector('.digital > .display > .hour'),
    minute: document.querySelector('.digital > .display > .minute'),
    second: document.querySelector('.digital > .display > .second'),
    millisecond: document.querySelector('.digital > .display > .millisecond'),
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

  /* View utility */
  function formatTime(value) {
    return value < 10 ? `0${value}` : value.toString();
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
  run();
}

/* Properly wait until whole page is loaded. */
window.addEventListener('DOMContentLoaded', app);
