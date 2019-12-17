var net = require('net');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var listConnections = [];

var server = net.createServer((client) => {
    
    listConnections.push(client);

    io.emit('broadcast', listConnections);

    console.log("conectado");

    client.on('data', (data) => {
        console.log(data);
        console.log(data.toString());
        client.write(data.toString())
    });
    
    client.on('end', () => {
        listConnections.r
        io.emit('broadcast', listConnections);
        console.log('desconectado');
    });

});

app.get('/c', (req, res) => {
    server.getConnections((err, count) => {
        console.log(count);
        res.send("" + count);
    });
    
})
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(9000, '127.0.0.1', () => {
    console.log('listening on *:9000');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});