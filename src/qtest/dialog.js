import { getElementByXpath } from '../locator.js';

const selectors = {
    closeButton: '//button[@title="Cancel"]',
};

function closeDialog() {
    const closeButton = getElementByXpath(selectors.closeButton);
    closeButton?.click();
}

function exec() {
    addEventListener('keydown', (event) => {
        if (event.isComposing) {
            return;
        }
        if (event.key === 'Escape') {
            closeDialog();
        }
    });
}

export { exec };
