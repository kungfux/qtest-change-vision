import { getElementByXpath, getElementsByXpath } from './locator.js';

const dialogDomElementName = 'TESTSTEP-HISTORY-MODAL';
const selectors = {
  dialog:
    '//span[contains(@class,"modal-title") and contains(text(),"History")]',
  tableCells:
    '//table//tr//td[contains(@class,"history-value") and position()>last()-2]',
};

function getHistoryDialog() {
  return getElementByXpath(selectors.dialog);
}

function highlightRow(row) {
  row.style.border = '2px solid red';
}

function updateDialogTitle(dialog, changesCount) {
  dialog.innerHTML = changesCount
    ? `History - <span style="color:red;"> ${changesCount} changes</span>`
    : 'History - <span style="color:green;"> no changes</span>';
}

function getChangedRows(historyDialog) {
  const cellsIterator = getElementsByXpath(
    selectors.tableCells,
    historyDialog
  );

  const changedRows = [];
  let leftCellNode = null;
  let rightCellNode = null;

  while (
    (leftCellNode = cellsIterator.iterateNext()) &&
    (rightCellNode = cellsIterator.iterateNext())
  ) {
    if (leftCellNode.textContent !== rightCellNode.textContent) {
      changedRows.push(leftCellNode.parentNode.parentNode);
    }
  }

  return changedRows;
}

function highlightChanges() {
  const historyDialog = getHistoryDialog();
  if (!historyDialog) {
    return;
  }

  const changedRows = getChangedRows(historyDialog);
  if (!changedRows.length) {
    updateDialogTitle(historyDialog, changedRows.length);
    return;
  }

  changedRows.forEach((row) => highlightRow(row));
  updateDialogTitle(historyDialog, changedRows.length);
}

export { dialogDomElementName, highlightChanges };
