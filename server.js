var net = require('net');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var listConnections = [];

const encodeMsg = (str) => {
    let hex = new TextEncoder().encode(str);
    let arr = Array.from(hex)
    arr.unshift(hex.length)
    return Buffer.from(arr).toString();
}

const decodeMsg = (str) => {
    let arr = Array.from(new TextEncoder().encode(str))
    arr = arr.slice(1)
    return Buffer.from(arr).toString();
}

var server = net.createServer((client) => {
    
    listConnections.push(client);

    io.emit('broadcast', listConnections);

    console.log("conectado");

    //client.write("prot|test|123");console.log("sent payload");
    
    client.on('data', (data) => {
        console.log(data);
        console.log(decodeMsg(data));
        //console.log(prepareMsg(data).toString());
        client.write(data.toString())
        //client.write("prot$test$123".toString());
    });
    
    client.on('end', () => {
        listConnections.r
        io.emit('broadcast', listConnections);
        console.log('desconectado');
    });

    client.on('error', (err) => {
        console.log(err);
    })
    
    //client.pipe(client);
});

io.on("connect",(client) => {
    client.on('msg', (msg) => {
        listConnections.forEach((i) => {
            i.write(prepareMsg(msg).toString());
            console.log("msg sent:", i, msg)
        })
    })
})
app.get('/n', (req, res) => {
    server.getConnections((err, count) => {
        console.log(count);
        res.send("" + count);
    });
    
})

app.get('/c', (req, res) => {
    res.send(JSON.stringify(listConnections));
})



app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

server.listen(8000, '127.0.0.1', () => {
    console.log('listening on *:8000');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});