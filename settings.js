var settings = require('./settings.json')

onload = () => {
    setAll()
}

function setAll(){
    var strbox = document.getElementById('strbox'),
        width_s = document.getElementById('width_slider'),
        height_s = document.getElementById('height_slider'),
        lan_sel = document.getElementById('lang_select'),
        deg_sel = document.getElementById('deg_select'),
        location = document.getElementById('city')

    strbox.value = getVal('str')

    width_s.value = getVal('width') 

    height_s.value = getVal('height') 

    lan_sel.value = getVal('lang') 

    deg_sel.value = getVal('degree') 

    location.value = getVal('location')

    setSizes()
}

function getVal(str) {
    return localStorage.getItem(str) == null ?
        settings[str]  : localStorage.getItem(str)
}

function initSettings () {
    window.open('file://' + __dirname + '/settings.html',
        'Settings',
        'width = 600, height = 400, frame = true, skipTaskbar = false')
}

function setStr() {
    var strbox = document.getElementById('strbox')
    localStorage.setItem('str', strbox.value)
}

function storeSize() {
    var width_s = document.getElementById('width_slider'),
        height_s = document.getElementById('height_slider')
    localStorage.setItem('width', width_s.value)
    localStorage.setItem('height', height_s.value)
}

function setSizes() {
    var width = document.getElementById('width_slider').value,
        height = document.getElementById('height_slider').value,
        width_ph = document.getElementById('width_ph'),
        height_ph = document.getElementById('height_ph')

    width_ph.textContent = width
    height_ph.textContent = height
}

function aboutCntnt() {
    window.open('file://' + __dirname + '/formatting.html',
        'Formatting',
        'width = 400, height = 300, frame = true')
}

function setLang() {
    var select = document.getElementById('lang_select')
    localStorage.setItem('lang', select.value)
}

function setLoc() {
    var select = document.getElementById('city')
    localStorage.setItem('location', select.value)   
}

function setDeg() {
    var select = document.getElementById('deg_select')
    localStorage.setItem('degree', select.value)
}