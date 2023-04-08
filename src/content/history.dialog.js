import { getElementByXpath, getElementsByXpath } from './locator.js';

const selectors = {
  historyDialog:
    '//span[contains(@class,"modal-title") and contains(text(),"History")]',
  historyDialogTableCells:
    '//table//tr//td[contains(@class,"history-value") and position()>last()-2]',
};

function getHistoryDialog() {
  return getElementByXpath(selectors.historyDialog);
}

function setHistoryDialogTitleInnerHtml(dialog, title) {
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
  row.style.border = '2px solid red';
}

function highlightChanges() {
  try {
    const historyDialog = getHistoryDialog();
    if (!historyDialog) {
      return;
    }

    const changedRows = getChangedRows(historyDialog);
    if (changedRows.length === 0) {
      setHistoryDialogTitleInnerHtml(historyDialog, 'History - no changes');
      return;
    }

    changedRows.forEach((row) => highlightRow(row));
    setHistoryDialogTitleInnerHtml(
      historyDialog,
      `History - <span style="color:red"> Changes highlighted</span>`
    );
  } catch (e) {
    // DOM changed, ignore and stop
  }
}

export { highlightChanges };
