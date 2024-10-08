const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { setupBLEBridge, checkBluetoothAvailability } = require('./ble-bridge');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../out/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', async () => {
  createWindow();
  setupBLEBridge();
  
  try {
    await checkBluetoothAvailability();
    console.log('Bluetooth is available');
  } catch (error) {
    console.error('Bluetooth is not available:', error.message);
    // You might want to show a dialog to the user here
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});