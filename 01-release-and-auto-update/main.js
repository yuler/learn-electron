const path = require("path");
const { app, BrowserWindow } = require("electron");
// const { autoUpdater } = require("electron-updater");

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// 	const MINUTE = 1000 * 60 * 30;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, MINUTE);
//
// 	autoUpdater.checkForUpdates();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
