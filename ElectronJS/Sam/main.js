'use strict'
const electron = require('electron');
const ipc = electron.ipcMain
const exec = require('child_process').execFile;


// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

const execute = (fileName, params, path) => {
  console.log('openning ' + fileName)
  let promise = new Promise((resolve, reject) => {
      exec(fileName, params, { cwd: path }, (err, data) => {
          if (err) reject(err);
          else resolve(data);
      });

  });
  return promise;
}

ipc.on('open-application', (event,arg) => {
  console.log(arg)
  switch(arg) {
    case 'notepad': execute('notepad++.exe',[],'D:\\Programs\\Notepad++')
    break;

    case 'chrome': execute('Chrome.exe',[],"C:\\Program Files (x86)\\Google\\Chrome\\Application")
    break;
    
    case 'taskmanager': execute('Taskmgr.exe',[],'C:\\Windows\\System32')
    break;

    case 'vscode': execute('Code.exe',[],'D:\\Programs\\Visual Studio Code\\Microsoft VS Code')
    break;

    default: console.warn('не опознано')
    break;
  }
})

process.env.GOOGLE_API_KEY = 'AIzaSyC2S6afgRgbdZI7HosQUO7FbKaifq2-k18'
process.env.GOOGLE_DEFAULT_CLIENT_ID = '383318624674-3t5mi8pp4uhnb2qmtsmpopvtije1agcu.apps.googleusercontent.com'
process.env.GOOGLE_DEFAULT_CLIENT_SECRET = 'VuFJqxVFxlUR_7gT0ARHFp7y'
