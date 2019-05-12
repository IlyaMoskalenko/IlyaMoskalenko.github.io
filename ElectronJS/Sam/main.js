"use strict"

// TODO: user commands interface using fs, fs.stat

const electron =      require('electron')
const shell =         require('electron').shell
const fs =            require('fs')

const app =           electron.app
const ipc =           electron.ipcMain
const BrowserWindow = electron.BrowserWindow

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL('file://' + __dirname + '/index.html')
  
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

ipc.on('open-application', (event,arg) => {
  switch(arg.action) {
    case 'notepad': shell.openItem('D:\\Programs\\Notepad++\\notepad++.exe')
    break;

    case 'chrome': shell.openItem("C:\\Program Files (x86)\\Google\\Chrome\\Application\\Chrome.exe")
    break;
    
    case 'taskmanager': shell.openItem('C:\\Windows\\System32\\Taskmgr.exe')
    break;

    case 'vscode': shell.openItem('D:\\Programs\\Visual Studio Code\\Microsoft VS Code\\Code.exe')
    break;

    case 'translate': shell.openExternal(`https://translate.google.by/?hl=ru&tab=wT#view=home&op=translate&sl=auto&tl=ru&text=${arg.option}`)
    break;

    default: console.warn('не опознано')
    break;
  }
})

process.env.GOOGLE_API_KEY = 'AIzaSyC2S6afgRgbdZI7HosQUO7FbKaifq2-k18'
process.env.GOOGLE_DEFAULT_CLIENT_ID = '383318624674-3t5mi8pp4uhnb2qmtsmpopvtije1agcu.apps.googleusercontent.com'
process.env.GOOGLE_DEFAULT_CLIENT_SECRET = 'VuFJqxVFxlUR_7gT0ARHFp7y'