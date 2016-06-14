'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
var settings = require('./settings.json'),
    os = require('os'),
    weather = require('weather-js'),
    l, t, w, count = 0
var settings = require('./settings.json');
var os = require('os')

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

function dName(day) {
    return settings.week[getVal('lang')][new Date().getDay()]
}

function mName(month) {
    return settings.months[getVal('lang')][new Date().getMonth()]
}


function getBattery() {
    var bl = require('battery-level')
    bl().then(function(level) {
        l = level;
    })
    return Math.floor(l * 100)
}

function getTemp() {
    if (count % 12000 === 0)
    weather.find({search: getVal('location'),
        degreeType: getVal('degree')}, function(error, result){
            if(result) t = result[0].current.temperature
        })
    return t
}

function getWeather() {
    if (count % 12000 === 0)
    weather.find({search: getVal('location'),
        degreeType: getVal('degree')}, function(error, result){
            if(result) w = result[0].current.skytext
        })
    return w
}

function getHour() {
    return new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours()
}

function getMin() {
    return new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()
}

function getSec() {
    return new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds()
}

function checkandcreate() {
    if (mainWindow === null)
        createWindow()
}

function fm() {
    return round(os.freemem() / 1024000000)
}

function tm() {
    return round(os.totalmem() / 1024000000)
}

function bm() {
    return round((os.totalmem() - os.freemem()) / 1024000000)
}

function fp() {
    return round(100 * os.freemem() / os.totalmem())
}

function bp() {
    return round(100 * ( 1 - (os.freemem() / os.totalmem())))
}

function getFullYear() {
    return new Date().getFullYear()
}

function getMonth() {
    return new Date().getMonth()
}

function getDate() {
    return new Date().getDate()
}

function round(int) {
    return parseFloat(Math.round(int * 100) / 100).toFixed(2)
}

function parse(str) {
    var features = ['H', 'm', 's', 'Y', 'M', 'N', 'd', 'w', 'fm', 'tm', 'bm', 'fp', 'bp', 'bl', 'ct', 'cw']

    var functions = [
        getHour,
        getMin,
        getSec,
        getFullYear,
        getMonth,
        mName,
        getDate,
        dName,
        fm,
        tm,
        bm,
        fp,
        bp,
        getBattery,
        getTemp,
        getWeather
    ]

    for (var i = 0; i < features.length; i++)
        while (str.indexOf('$' + features[i]) > -1)
            str = str.replace('$' + features[i], functions[i]())

    return str
}

function getVal(str) {
    return localStorage.getItem(str) == null ?
        settings[str]  : localStorage.getItem(str)
}