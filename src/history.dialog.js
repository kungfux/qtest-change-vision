import { getElementByXpath, getElementsByXpath } from './locator.js';

const highlightStyles = {
  row: '2px solid red',
  title: 'color:red',
};
const selectors = {
  historyDialog:
    '//span[contains(@class,"modal-title") and contains(text(),"History")]',
  historyDialogTableCells:
    '//table//td[contains(@class,"history-value") and .//p]',
};

function getHistoryDialog() {
  return getElementByXpath(selectors.historyDialog);
}

function setHistoryDialogInnerHtml(dialog, title) {
  dialog.innerHTML = title;
}

function getChangedRows(historyDialog) {
  const cellsIterator = getElementsByXpath(
    selectors.historyDialogTableCells,
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

function highlightRow(row) {
  row.style.border = highlightStyles.row;
}

function highlightChanges() {
  try {
    const historyDialog = getHistoryDialog();
    if (!historyDialog) {
      return;
    }

    const changedRows = getChangedRows(historyDialog);
    if (changedRows.length === 0) {
      setHistoryDialogInnerHtml(historyDialog, 'History - no changes');
      return;
    }

    changedRows.forEach((row) => highlightRow(row));
    setHistoryDialogInnerHtml(
      historyDialog,
      `History - <span style="${highlightStyles.title}"> Changes highlighted</span>`
    );
  } catch (e) {
    // DOM changed, ignore and stop
  }
}

export { highlightChanges };
