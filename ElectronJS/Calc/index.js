const path = require('path')
const url = require('url')
const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

let mainWindow

// Создание окна приложения
function createWindow () {

    // Основная конфигуация
    mainWindow = new BrowserWindow({
        width: 300,
        height: 450,
        //fullscreen:true,
        // frame:false,
        resizable:false,
        icon: __dirname + '/images/calc.png'
    })

    // Загрузка html файла главного окна

    // mainWindow.loadURL('file://' + __dirname + '/index.html')
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
       
    // Закрытие главного окна
    mainWindow.on('closed', function() {
        mainWindow = null
    })

} 

// Создание окна при готовности приложения
app.on('ready', createWindow) 

// Закрытие окна и сворачивание в док панель если это OS X
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Восстановление окна
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})


