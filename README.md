# Introduction

`Assistant for qTest Manager` is a browser extension that adds extra functionality to qTest Manager.

# Features

> Check out [demo](#demo) section to see it in action.

- Test case review process improvements
  - Highlight changes in `History` dialog
  - Scroll to latest revision in `History` tab automatically
- User experience improvements
  - Close dialogs by pressing `Escape` key on keyboard

# Install

Add an extension to your favorite browser by visiting extensions store

- [https://addons.mozilla.org/](https://addons.mozilla.org/en-US/firefox/addon/assistant-for-qtest-manager/)

# Build and test locally

- Install [Node.js](https://nodejs.org/) (LTS version)
- Run following commands from project's root directory to build extension

```bash
$ npm install # Restore project dependencies
$ npm run build:chrome # Build extension for Chrome
$ npm run build:firefox # Build extension for Firefox
```

- Run following commands to debug extension

```bash
$ npm run watch:chrome
$ npm run watch:firefox
```

- Follow these articles to load unpacked extension from `dist` folder into your browser
  - [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
  - [Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

# Demo

![Highlight changes demo](docs/highlight.gif)
&nbsp;
![Scroll to latest change](docs/scroll.gif)
&nbsp;
