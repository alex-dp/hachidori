var settings = require('./settings.json')

onload = () => {
    setAll()
}

function setAll(){
    var strbox = document.getElementById('strbox')
    var width_s = document.getElementById('width_slider'),
        height_s = document.getElementById('height_slider')

    strbox.value = localStorage.getItem('str') == null ?
        settings.str : localStorage.getItem('str')

    width_s.value = localStorage.getItem('width') == null ?
        settings.width  : localStorage.getItem('width')

    height_s.value = localStorage.getItem('height') == null ?
        settings.height  : localStorage.getItem('height')

    setSizes()
}

function initSettings () {
    window.open('file://' + __dirname + '/settings.html',
        'Settings',
        'width = 600, height = 400, frame = true')
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