"use strict"

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
<<<<<<< HEAD
var settings = require('./settings.json'),
    os = require('os'),
    weather = require('weather-js'),
    l, t, w, count = 0
=======
var settings = require('./settings.json');
var os = require('os')
>>>>>>> bf169cf5d1a4b12a5495471ab706a8d2461b29d5

let mainWindow

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 200,
        height: 200,
        frame: false,
<<<<<<< HEAD
        transparent: true,
        icon: __dirname + '/images/hachidori.png',
        skipTaskbar: true
=======
        transparent: true
        //icon: __dirname + '/images/ic_launcher.png'
>>>>>>> bf169cf5d1a4b12a5495471ab706a8d2461b29d5
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
<<<<<<< HEAD

    count++;
}

function wtos(day) {
    var week
    if(localStorage.getItem('lang'))
        week = settings.week[localStorage.getItem('lang')]
    else week = settings.week.en
    return week[day]
}

function mtos(month) {
    var months = settings.months[getVal('lang')]
    return months[month]
}


function getBattery() {
    var bl = require('battery-level')
    bl().then(function(level) {
        l = level;
    })
    return Math.floor(l * 100)
}

function getTemp() {
    if (count % 1200000 === 0)
    weather.find({search: getVal('location'),
        degreeType: getVal('degree')}, function(error, result){
            t = result[0].current.temperature
        })
    return t;
}

function getWeather() {
    if (count % 1200000 === 0)
    weather.find({search: getVal('location'),
        degreeType: getVal('degree')}, function(error, result){
            w = result[0].current.skytext
        })
    return w;
=======
}

function wtos(day) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day]
>>>>>>> bf169cf5d1a4b12a5495471ab706a8d2461b29d5
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
<<<<<<< HEAD
    var features = ['H', 'm', 's', 'Y', 'M', 'N', 'd', 'w', 'fm', 'tm', 'bm', 'fp', 'bp', 'bl', 'ct', 'cw']
=======
    var features = ['H', 'm', 's', 'Y', 'M', 'd', 'w', 'fm', 'tm', 'bm', 'p']
>>>>>>> bf169cf5d1a4b12a5495471ab706a8d2461b29d5

    var functions = [
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
        date.getFullYear(),
        date.getMonth(),
<<<<<<< HEAD
        mtos(date.getMonth()),
        date.getDate(),
        wtos(date.getDay()),
        round(os.freemem() / 100000000),
        round(os.totalmem() / 1000000000),
        round((os.totalmem() - 10 * os.freemem()) / 1000000000),
        round(1000 * os.freemem() / os.totalmem()),
        round(100 * (1 - 10 * os.freemem() / os.totalmem())),
        getBattery(),
        getTemp(),
        getWeather()
=======
        date.getDate(),
        wtos(date.getDay()),
        round(os.freemem() / 102400000),
        round(os.totalmem() / 1000000000),
        round(os.totalmem() / 1000000000) - round(os.freemem() / 102400000),
        round((os.freemem() / os.totalmem()) * (250000 / 256))
>>>>>>> bf169cf5d1a4b12a5495471ab706a8d2461b29d5
    ]

    for (var i = 0; i < features.length; i++)
        while (str.indexOf('$' + features[i]) > -1)
            str = str.replace('$' + features[i], functions[i])

    return str
<<<<<<< HEAD
}

function getVal(str) {
    return localStorage.getItem(str) == null ?
        settings[str]  : localStorage.getItem(str)
=======
>>>>>>> bf169cf5d1a4b12a5495471ab706a8d2461b29d5
}