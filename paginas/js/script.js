
var sessioncode = makeid(10);
var linksession = window.location.protocol + "//" + window.location.host + '/controle?sessioncode=' + sessioncode
console.log(linksession)
const canvas = document.getElementById("lousa");
const ctx = canvas.getContext('2d');
var socket = io();

document.getElementById('qrcode').src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${linksession}`


socket.emit('newUser', sessioncode)
socket.on('screen', (width, height) => {
    canvas.width = width;
    canvas.height = height - 100;
})
socket.on('desenhar', function(pincel){
    desenhar(pincel);
});
socket.on('QrCode', function(){
    let qrback = document.getElementById('qrback')
    qrback.parentNode.removeChild(qrback)
})

function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function desenhar(pincel){
    ctx.beginPath(); //inicia
    ctx.moveTo(pincel.posInicio.x, pincel.posInicio.y) //onde começa a linha
    ctx.lineTo(pincel.posFim.x, pincel.posFim.y) //onde termina a linha
    ctx.linewidth = 5;
    ctx.stroke(); //desenha a linha
}