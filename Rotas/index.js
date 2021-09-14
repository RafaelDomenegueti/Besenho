module.exports = function(app, dir, io, Users){

    // Rotas
    app.get("/", function(req, res){
        res.sendFile(dir+ "/paginas/views/index.html")
    })
    app.get("/controle", function(req, res){
        res.sendFile(dir+ "/paginas/views/controle.html")
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

}