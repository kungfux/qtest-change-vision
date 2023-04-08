import { highlightChanges } from './history.dialog.js';

function loop() {
  setTimeout(() => {
    highlightChanges();
    loop();
  }, 2000);
}

function main() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  loop();
}

(() => {
  main();
})();
