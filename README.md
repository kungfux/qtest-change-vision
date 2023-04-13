# Introduction

`qTest Manager Assistant` is a browser extension that adds extra functionality to qTest Manager to make the work easier.

# Features

- Global
  - Close dialogs by pressing `Escape` key on keyboard
- Test Design tab
  - Highlight changes in `History` dialog
  - Scroll to latest change in `History` tab automatically

# Development

## How to build and test

- Make sure you have Node.js and npm installed
- Execute `npm install` to restore project dependencies
- Run `npm run build:chrome` or `npm run build:firefox` to compile and bundle source code
- Load unpacked extension from `dist` folder into your browser
  - [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)
  - [Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

# Demo

![Highlight changes demo](docs/highlight.gif)
&nbsp;
![Scroll to latest change](docs/scroll.gif)
&nbsp;
