// Require
const express = require("express")
const consign = require("consign")
const app = express()
const path = require("path")
const bodyparser = require("body-parser")
const dir = __dirname
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Config
    // Deixa ultilizar o css e js
    app.use(express.static(path.join(__dirname, "./paginas")))

    // Receber informações
    var urlencodedParser = bodyparser.urlencoded({ extended: false })
    app.use(bodyparser.urlencoded({ extended: false }))

// Users
var Users = []

//  Rotas
//consign().include("Rotas").into(app, dir, io, Users)

// Rotas
app.get("/", function(req, res){
    res.sendFile("./paginas/views/index.html")
})
app.get("/controle", function(req, res){
    res.sendFile("./paginas/views/controle.html")
})

io.on('connection', function(socket){

    // Links
    socket.on('newUser', function(session){
        Users.push({id:socket.id, session:session})
    });
    socket.on('desenhar', function(session, pincel){
        io.to(idIo(session)).emit('desenhar', pincel);
    });
    socket.on('QrCode', function(session){
        io.to(idIo(session)).emit('QrCode');
    });
    socket.on('screen', function(session, width, height){
        io.to(idIo(session)).emit('screen', width, height);
    });
    
    // Functions
    function idIo(session){
        for(var i=0; i<Users.length; i++) {
            if(Users[i].session == session) {
                return Users[i].id;
            }
        }
    }

});

// Porta
http.listen(443, "localhost", function(){
    console.log("Servidor On-line")
})