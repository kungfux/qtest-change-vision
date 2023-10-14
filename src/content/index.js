import { exec as dismissDialogExec } from '../qtest/dismiss-dialog.js';
import { trigger as highlightHistoryTrigger, exec as highlightHistoryExec } from '../qtest/tab/test-design/highlight-history.js';
import { trigger as scrollHistoryTrigger, exec as scrollHistoryExec } from '../qtest/tab/test-design/scroll-history.js';
import { trigger as copyNumberTrigger, exec as copyNumberExec } from '../qtest/tab/test-design/copy-number.js';

const subscribers = [];

const onDomChangeCallback = (mutations, observer) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      const addedNodes = mutation.addedNodes;

      if (!addedNodes.length) {
        return;
      }

      addedNodes.forEach(node => {
        subscribers.filter(subscriber => subscriber.trigger.mutationType === 'childList').forEach(subscriber => {
          const trigger = subscriber.trigger;

          const isTagNameMatched = !trigger.tagName || trigger.tagName === node.localName;
          const isIdMatched = !trigger.id || trigger.id === node.id;

          if (isTagNameMatched && isIdMatched) {
            subscriber.exec(node.baseURI);
          }
        });
      });
    }
  }
}

function main() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  subscribers.push({ trigger: highlightHistoryTrigger, exec: highlightHistoryExec });
  subscribers.push({ trigger: scrollHistoryTrigger, exec: scrollHistoryExec });
  subscribers.push({ trigger: copyNumberTrigger, exec: copyNumberExec });

  dismissDialogExec();

  const config = { childList: true, subtree: true };
  const observer = new MutationObserver(onDomChangeCallback);
  observer.observe(document.body, config);
}

(() => {
  main();
})();
