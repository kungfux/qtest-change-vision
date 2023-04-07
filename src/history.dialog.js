import { getElementByXpath, getElementsByXpath } from './locator.js';

const highlightStyle = '2px solid red';

const selectors = {
  historyDialog:
    '//span[contains(@class,"modal-title") and contains(text(),"History")]',
  historyDialogTableCells:
    '//table//td[contains(@class,"history-value") and .//p]',
};

function highlightChanges() {
  try {
    const historyDialog = getElementByXpath(selectors.historyDialog);
    if (!historyDialog) {
      return;
    }

    let changesFound = false;
    const cellsIterator = getElementsByXpath(
      selectors.historyDialogTableCells,
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

export { highlightChanges };
