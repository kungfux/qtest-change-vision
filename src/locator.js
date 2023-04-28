function getElementByXpath(xpath, context = document) {
  const result = document.evaluate(
    xpath,
    context,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );

  return result.singleNodeValue;
}

function getElementsByXpath(xpath, context = document) {
  const iterator = document.evaluate(
    xpath,
    context,
    null,
    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null
  );
  const nodes = [];

  let node;
  while ((node = iterator.iterateNext())) {
    nodes.push(node);
  }

  return nodes;
}

function waitForElement(xpath, context = document, timeout = 30000) {
  return new Promise((resolve, reject) => {
    if (getElementByXpath(xpath, context)) {
      return resolve(getElementByXpath(xpath, context));
    }

    setTimeout(() => {
      reject(new Error(`Timed out after ${timeout} ms waiting for element with selector '${xpath}' to be present in DOM`));
    }, timeout);

    const observer = new MutationObserver(() => {
      if (getElementByXpath(xpath, context)) {
        resolve(getElementByXpath(xpath, context));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function waitForElementVisible(xpath, context = document, timeout = 30000) {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      const element = getElementByXpath(xpath, context);
      if (element && element.offsetParent !== null) {
        clearInterval(intervalId);
        resolve(element);
      }
      if (Date.now() - startTime >= timeout) {
        clearInterval(intervalId);
        reject(new Error(`Timed out after ${timeout} ms waiting for element with selector '${xpath}' to become visible`));
      }
    }, 100);
  });
}

export { getElementByXpath, getElementsByXpath, waitForElement, waitForElementVisible };
