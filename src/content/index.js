import { trigger as historyDialogTrigger, exec as historyDialogExec } from '../qtest/tab/test-design/history.dialog.js';
import { trigger as testCasePageTrigger, exec as testCasePageExec } from '../qtest/tab/test-design/test-case.view.js';

const subscribers = [];

const onDomChangeCallback = (mutations, observer) => {
  for (const mutation of mutations) {
    const addedNodes = mutation.addedNodes;

    if (!addedNodes.length) {
      return;
    }

    addedNodes.forEach(node => {
      subscribers.forEach(subscriber => {
        const trigger = subscriber.trigger;

        const isMutationTypeMatched = !trigger.mutationType || trigger.mutationType === mutation.type;
        const isTagNameMatched = !trigger.tagName || trigger.tagName === node.localName;
        const isIdMatched = !trigger.id || trigger.id === node.id;

        if (isMutationTypeMatched && isTagNameMatched && isIdMatched) {
          subscriber.exec(node.baseURI);
        }
      });
    });

  }
}

function main() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  subscribers.push({ trigger: historyDialogTrigger, exec: historyDialogExec });
  subscribers.push({ trigger: testCasePageTrigger, exec: testCasePageExec });

  const config = { childList: true, subtree: true };
  const observer = new MutationObserver(onDomChangeCallback);
  observer.observe(document.body, config);
}

(() => {
  main();
})();
