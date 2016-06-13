"use strict"

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
var settings = require('./settings.json');
var os = require('os')

let mainWindow

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 200,
        height: 200,
        frame: false,
        transparent: true
        //icon: __dirname + '/images/ic_launcher.png'
    })
    mainWindow.loadURL('file://' + __dirname + '/index.html')
    mainWindow.on('closed', function () { mainWindow = null })
}

app.on('ready', createWindow)
app.on('window-all-closed', quitall)
app.on('activate', checkandcreate)

function quitall() {
    if (process.platform !== 'darwin')
        app.quit()
}

function update () {
    var elem = document.getElementById('color')
    var str = localStorage.getItem('str') == null ?
        settings.str : localStorage.getItem('str')

    str = parse(str)

    elem.innerHTML = str

    if (localStorage.getItem('width'))
        window.resizeTo(localStorage.getItem('width'), localStorage.getItem('height'))
}

function wtos(day) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]
}

function checkandcreate() {
    if (mainWindow === null)
        createWindow()
}

function round(int) {
    return parseFloat(Math.round(int * 100) / 100).toFixed(2)
}

function parse(str) {
    var date = new Date()
    var features = ['H', 'm', 's', 'Y', 'M', 'd', 'w', 'fm', 'tm', 'bm', 'p']

    var functions = [
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        wtos(date.getDay()),
        round(os.freemem() / 102400000),
        round(os.totalmem() / 1000000000),
        round(os.totalmem() / 1000000000) - round(os.freemem() / 102400000),
        round((os.freemem() / os.totalmem()) * (250000 / 256))
    ]

    for (var i = 0; i < features.length; i++)
        while (str.indexOf('$' + features[i]) > -1)
            str = str.replace('$' + features[i], functions[i])

    return str
}