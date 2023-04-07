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

export { getElementByXpath, getElementsByXpath };
