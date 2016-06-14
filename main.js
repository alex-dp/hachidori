"use strict"

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
var settings = require('./settings.json'),
    os = require('os'),
    weather = require('weather-js'),
    l, t, w, count = 0

let mainWindow

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 200,
        height: 200,
        frame: false,
        transparent: true,
        icon: __dirname + '/images/hachidori.png',
        skipTaskbar: true
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
    var features = ['H', 'm', 's', 'Y', 'M', 'N', 'd', 'w', 'fm', 'tm', 'bm', 'fp', 'bp', 'bl', 'ct', 'cw']

    var functions = [
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
        date.getFullYear(),
        date.getMonth(),
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
    ]

    for (var i = 0; i < features.length; i++)
        while (str.indexOf('$' + features[i]) > -1)
            str = str.replace('$' + features[i], functions[i])

    return str
}

function getVal(str) {
    return localStorage.getItem(str) == null ?
        settings[str]  : localStorage.getItem(str)
}