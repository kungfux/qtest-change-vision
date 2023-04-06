const selectors = {
  historyDialog:
    '//span[contains(@class,"modal-title") and contains(text(),"History")]',
  historyDialogCells: '//table//td[contains(@class,"history-value") and .//p]',
};
const highlightStyle = '2px solid red';

function getElementsByXpath(xpath, contextNode = null) {
  return document.evaluate(
    xpath,
    contextNode ?? document,
    null,
    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null
  );
}

function getElementByXpath(xpath) {
  const iterator = getElementsByXpath(xpath);
  const node = iterator.iterateNext();
  return node;
}

function highlight() {
  try {
    const historyDialog = getElementByXpath(selectors.historyDialog);
    if (!historyDialog) {
      return;
    }

    let changesFound = false;
    const cellsIterator = getElementsByXpath(
      selectors.historyDialogCells,
      historyDialog
    );

    let leftCellNode = null;
    let rightCellNode = null;
    while (
      (leftCellNode = cellsIterator.iterateNext()) &&
      (rightCellNode = cellsIterator.iterateNext())
    ) {
      if (leftCellNode.textContent !== rightCellNode.textContent) {
        changesFound = true;
        leftCellNode.parentNode.parentNode.style.border = highlightStyle;
      }
    }

    historyDialog.innerHTML = changesFound
      ? 'History - <span style="color:red"> Changes highlighted</span>'
      : 'History - no changes';
  } catch (InvalidStateError) {
    // ignore
  }
}

function main() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  window.setInterval(highlight, 5000);
}

(() => {
  main();
})();
