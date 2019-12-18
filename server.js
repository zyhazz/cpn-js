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

    io.emit('status', listConnections);

    client.on('data', (data) => {
        io.emit('response', decodeMsg(data));
    });
    
    client.on('end', () => {
        listConnections.r
        io.emit('status', listConnections);
    });

    client.on('error', (err) => {
        console.log(err);
    })
    
});

io.on("connect",(client) => {
    client.on('request', (msg) => {
        listConnections.forEach((i) => {
            i.write(encodeMsg(msg));
        })
    })
    io.emit('status', listConnections);
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
    console.log('listening cpn on *:8000');
});

http.listen(3000, function(){
    console.log('listening web on *:3000');
});