module.exports = (function() {
  const electron = require('electron');
  const dialog = electron.dialog;
  const browserWindow = electron.BrowserWindow;
  const thumb = require('./b64img_thumb/index.js');
  return function openFile(callback) {
    let focusedWin = browserWindow.getFocusedWindow();
    dialog.showOpenDialog(focusedWin, {
      properties: ['openDirectory']
    }, (args) => {
      thumb(args[0]).then((result) => {
        callback(result[0]);
      });
    });
  };
})();