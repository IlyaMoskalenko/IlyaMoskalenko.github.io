"use strict"

const electron =      require('electron')
const filesize =      require('filesize')
const isImage =       require('is-image')
const path =          require('path')
const fs =            require('fs')

const BrowserWindow = electron.BrowserWindow
const ipcMain =       electron.ipcMain
const dialog =        electron.dialog
const shell =         electron.shell
const app =           electron.app

let mainWindow

function createWindow () {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({ width: width, height: height, webPreferences: {nodeIntegration: true}})

  mainWindow.loadURL('file://' + __dirname + '/index.html')
  
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function() {
    mainWindow = null
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(mainWindow, {
      title: 'Выберите папку',
      buttonLabel: 'Открыть',
      properties: ['openDirectory']
    },
    (dir) => {
      const images = []
      if (dir) {
        fs.readdir(dir[0], (err, files) => { 
          for (var i = 0, length1 = files.length; i < length1; i++) {
            if (isImage(files[i])) {
              let imageFile = path.join(dir[0], files[i])
              let stats = fs.statSync(imageFile)
              let size = filesize(stats.size, {round: 0})
              images.push({filename: files[i], src: `file://${imageFile}`, size: size})
            }
          }
          // console.log(images)
          event.sender.send('images-reply', images)
        })
      }
    })
})