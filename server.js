// Require
const express = require("express")
const consign = require("consign")
const app = express()
const path = require("path")
const bodyparser = require("body-parser")
const { cachedDataVersionTag } = require("v8")
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
consign().include("Rotas").into(app, dir, io, Users)

// Porta
http.listen(8221, "localhost", function(){
    console.log("Servidor On-line")
})