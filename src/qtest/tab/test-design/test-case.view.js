import { waitForElement, waitForElementVisible } from '../../../locator.js';

const trigger = {
  mutationType: 'childList',
  tagName: 'tab-view',
  id: 'testCaseTabView'
};

const selectors = {
  historyTab: '//tab-view[@id="testCaseTabView"]//tab-nav//ul//span[contains(text(),"History")]//parent::a',
  lastHistoryExpandedRow: '(//tab-view[@id="testCaseTabView"]//table[@class="change-list"]//tr[not(contains(@class,"history"))])[last()]',
  lastHistoryRowExpand: '(//tab-view[@id="testCaseTabView"]//table[@class="change-list"]//tr[not(contains(@class,"history"))])[last()-1]//span',
};

let lastBaseURI = null;

async function getHistoryTab() {
  return await waitForElement(selectors.historyTab);
}

async function addOnClickEventListener() {
  const historyTab = await getHistoryTab();
  if (!historyTab) {
    return;
  }

  historyTab.addEventListener("click", async () => {
    const lastHistoryRowExpand = await waitForElementVisible(selectors.lastHistoryRowExpand);
    lastHistoryRowExpand?.click();

    setTimeout(async () => {
      const lastHistoryExpandedRow = await waitForElementVisible(selectors.lastHistoryExpandedRow);
      lastHistoryExpandedRow?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  });
}

function exec(baseURI) {
  if (baseURI !== lastBaseURI) {
    lastBaseURI = baseURI;
    addOnClickEventListener();
  }
}

export { trigger, exec };
