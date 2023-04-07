import { highlightChanges } from './history.dialog.js';

function main() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  (function loop() {
    setTimeout(() => {
      highlightChanges();
      loop();
    }, 2000);
  })();
}

(() => {
  main();
})();
