import { dialogDomElementName as historyDialogDomElementName, highlightChanges } from './history.dialog.js';

const onDomChangeCallback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.addedNodes.length) {
      for (const node of mutation.addedNodes) {
        if (node.tagName === historyDialogDomElementName) {
          setTimeout(highlightChanges, 500);
          return;
        }
      }
    }
  }
}

function main() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const config = { childList: true };
  const observer = new MutationObserver(onDomChangeCallback);
  observer.observe(document.body, config);
}

(() => {
  main();
})();
