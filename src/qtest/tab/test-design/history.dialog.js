import { getElementsByXpath, waitForElementVisible } from '../../../locator.js';

const trigger = {
  mutationType: 'childList',
  tagName: 'teststep-history-modal'
};

const selectors = {
  dialog:
    '//span[contains(@class,"modal-title") and contains(text(),"History")]',
  tableCells:
    '//table//tr//td[contains(@class,"history-value") and position()>last()-2]',
};

async function getHistoryDialog() {
  return await waitForElementVisible(selectors.dialog);
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
  const cells = getElementsByXpath(
    selectors.tableCells,
    historyDialog
  );

  const changedRows = [];
  let leftCellNode = null;
  let rightCellNode = null;

  for (let i = 0; i < cells.length; i += 2) {
    leftCellNode = cells[i];
    rightCellNode = cells[i + 1];
    if (leftCellNode.textContent !== rightCellNode.textContent) {
      changedRows.push(leftCellNode.parentNode.parentNode);
    }
  }

  return changedRows;
}

async function highlightChangedRows(historyDialog) {
  setTimeout(() => {
    const changedRows = getChangedRows(historyDialog);
    if (!changedRows.length) {
      updateDialogTitle(historyDialog, changedRows.length);
      return;
    }

    changedRows.forEach((row) => highlightRow(row));
    updateDialogTitle(historyDialog, changedRows.length);
  }, 250);
}

async function exec() {
  const historyDialog = await getHistoryDialog();
  if (!historyDialog) {
    return;
  }

  highlightChangedRows(historyDialog);
}

export { trigger, exec };
