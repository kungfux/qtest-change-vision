import { getElementByXpath, waitForElement } from '../../../locator';

const trigger = {
  mutationType: 'childList',
  tagName: 'property',
  id: 'testcase_properties_StatusTestCaseSystemField_Status'
};

const selectors = {
  testCaseNumber: '//*[@id="testCaseHeader_name"]',
  testCaseName: '//*[@id="testCaseHeader_editableContent"]',
  copyButtonContainer: '//*[@id="testCaseHeader_editable"]/../span'
}

async function exec(baseURI) {
  const container = await waitForElement(selectors.copyButtonContainer);

  const testCaseNumber = getElementByXpath(selectors.testCaseNumber)?.textContent ?? '';
  const testCaseName = getElementByXpath(selectors.testCaseName)?.textContent ?? '';
  const testCaseUrl = baseURI;

  addStyles(`
    .qma-copy-dd {
      position: relative;
      display: inline-block;
    }
    .qma-copy-content {
      display: none;
      position: absolute;
      background-color: #fff;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 9999;
      white-space: nowrap;
      border-radius: 4px;
    }
    .qma-copy-content a {
      text-decoration: none;
      display: block;
      padding: 7px 10px;
      border-radius: 4px;
    }
    .qma-copy-content a:hover {
      color: #fff !important;
      background-color: #1885ca;
    }
    .qma-copy-content a:focus,
    .qma-copy-content a:active {
      background-color: #333;
      color: #fff;
      transition: background-color .1s;
    }
    .qma-open-copy-content {
      display: block;
    }
    hr.qma-copy-hr {
      color: #333;
      background-color: #333;
      opacity: .2;
      border: none;
      height: 1px;
      margin: 3px 0;
    }`);
  const copyContainer = `
  <div id='qma-copy-section' class="qma-copy-dd">
    <button class="btn btn-default actionBtn">Copy & Share</button>
      <div class="qma-copy-content">
        <a id="qma-copy-link" title="${testCaseUrl}">Link</a>
        <a id="qma-copy-number" title="${testCaseNumber}">Number</a>
        <hr class="qma-copy-hr"/>
        <a id="qma-copy-number-and-link" title="${testCaseNumber} ${testCaseUrl}">Number and Link</a>
        <a id="qma-copy-number-and-name" title="${testCaseNumber} ${testCaseName}">Number and Name</a>
        <hr class="qma-copy-hr"/>
        <a id="qma-copy-markdown" title="[${testCaseNumber} ${testCaseName}](${testCaseUrl})">Markdown</a>
      </div>
  </div>
  `;

  container.insertAdjacentHTML('afterbegin', copyContainer);

  const copySection = getElementByXpath('//*[@id="qma-copy-section"]');
  const copyContent = getElementByXpath('//*[@class="qma-copy-content"]');

  copySection.addEventListener('mouseenter', () => {
    copyContent.classList.add('qma-open-copy-content');
  });
  copySection.addEventListener('mouseleave', () => {
    copyContent.classList.remove('qma-open-copy-content');
  });

  getElementByXpath('//*[@id="qma-copy-link"]')?.addEventListener('click', () => {
    copyToClipboard(testCaseUrl);
    copyContent.classList.remove('qma-open-copy-content');
  });
  getElementByXpath('//*[@id="qma-copy-number"]')?.addEventListener('click', () => {
    copyToClipboard(testCaseNumber);
    copyContent.classList.remove('qma-open-copy-content');
  });
  getElementByXpath('//*[@id="qma-copy-number-and-link"]')?.addEventListener('click', () => {
    copyToClipboard(`${testCaseNumber} ${testCaseUrl}`);
    copyContent.classList.remove('qma-open-copy-content');
  });
  getElementByXpath('//*[@id="qma-copy-number-and-name"]')?.addEventListener('click', () => {
    copyToClipboard(`${testCaseNumber} ${testCaseName}`);
    copyContent.classList.remove('qma-open-copy-content');
  });
  getElementByXpath('//*[@id="qma-copy-markdown"]')?.addEventListener('click', () => {
    copyToClipboard(`[${testCaseNumber} ${testCaseName}](${testCaseUrl})`);
    copyContent.classList.remove('qma-open-copy-content');
  });
}

function addStyles(css) {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.append(style);
}

function copyToClipboard(text) {
  const copyTextArea = document.createElement('textarea');
  copyTextArea.value = text;
  document.body.append(copyTextArea);
  copyTextArea.focus();
  copyTextArea.select();
  try {
    document.execCommand('copy');
  } catch (error) {
    console.error(`Copy to clipboard error: ${error}`);
  }
  copyTextArea.remove();
}

export { trigger, exec };
