const urlParams = new URLSearchParams(window.location.search);
const sessioncode = urlParams.get('sessioncode');
const canvas = document.getElementById("lousa");
const ctx = canvas.getContext('2d');
var socket = io();

canvas.width = window.screen.width;
canvas.height = window.screen.height;

var pincel = {
    ativo: false,
    movendo: false,
    posInicio:{
        x: 0,
        y: 0
    },
    posFim:{
        x: 0,
        y: 0
    }
}

canvas.addEventListener('touchstart', (mouse) => {
    pincel.ativo = true;
    pincel.posInicio.x = mouse.clientX - document.getElementById('lousa').style.left;
    pincel.posInicio.y = mouse.clientY;
})
canvas.addEventListener('touchend', (mouse) => {
    pincel.ativo = false; 
    pincel.posFim.x = mouse.clientX - document.getElementById('lousa').style.left;
    pincel.posFim.y = mouse.clientY;
})
canvas.addEventListener('touchmove', (mouse) => {
    pincel.movendo = true;
    pincel.posInicio.x = mouse.targetTouches[0].clientX - document.getElementById('lousa').style.left;
    pincel.posInicio.y = mouse.targetTouches[0].clientY;
})

function desenhar(pincel){
    ctx.beginPath(); //inicia
    ctx.moveTo(pincel.posInicio.x, pincel.posInicio.y) //onde começa a linha
    ctx.lineTo(pincel.posFim.x, pincel.posFim.y) //onde termina a linha
    ctx.stroke(); //desenha a linha
}

function ciclo() {
    if(pincel.ativo && pincel.movendo) { 
        //desenhar(pincel);   
        socket.emit('desenhar', sessioncode, pincel);
        pincel.movendo = false;
    }
    pincel.posFim = {x: pincel.posInicio.x, y: pincel.posInicio.y}

    setTimeout(ciclo, 20);
}

window.addEventListener('orientationchange', function() {
    socket.emit('screen', sessioncode, window.screen.width, window.screen.height);
}, false);

ciclo()
socket.emit('QrCode', sessioncode);
socket.emit('screen', sessioncode, window.screen.width, window.screen.height);