const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
    },
  });

  win.loadFile('index.html');
//   win.removeMenu();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
