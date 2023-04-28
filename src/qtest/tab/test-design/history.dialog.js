import { getElementsByXpath, waitForElementVisible } from '../../../locator.js';

const trigger = {
  mutationType: 'childList',
  tagName: 'teststep-history-modal'
};

const selectors = {
  dialogTitle:
    '//span[contains(@class,"modal-title") and contains(text(),"History")]',
  tableCells:
    '//table//tr//td[contains(@class,"history-value") and position()>last()-2]',
};

async function getHistoryDialogTitle() {
  return await waitForElementVisible(selectors.dialogTitle);
}

function highlightRow(row) {
  row.style.border = '2px solid red';
}

function updateDialogTitle(historyDialogTitle, changesCount) {
  const extraTitle = document.createElement('span');
  extraTitle.style.color = changesCount ? 'red' : 'green';
  extraTitle.style.textTransform = 'none';
  extraTitle.textContent = changesCount ? `${changesCount} change(s)` : 'no changes';
  historyDialogTitle.textContent += ' - ';
  historyDialogTitle.appendChild(extraTitle);
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

async function highlightChangedRows(historyDialogTitle) {
  setTimeout(() => {
    const changedRows = getChangedRows(historyDialogTitle);
    if (!changedRows.length) {
      updateDialogTitle(historyDialogTitle, changedRows.length);
      return;
    }

    changedRows.forEach((row) => highlightRow(row));
    updateDialogTitle(historyDialogTitle, changedRows.length);
  }, 250);
}

async function exec() {
  const historyDialogTitle = await getHistoryDialogTitle();
  if (!historyDialogTitle) {
    return;
  }

  highlightChangedRows(historyDialogTitle);
}

export { trigger, exec };
