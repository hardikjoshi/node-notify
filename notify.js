#! /usr/local/bin/node

var AUCTION_HOST = '192.168.1.181';
var AUCTION_PORT = 8080;
var server_flag  = 'http'; // flag will decide weather http request or https request
var options = {
    //key: fs.readFileSync('/etc/saas_cert/www.vend-x.com.key'),
    //cert: fs.readFileSync('/etc/saas_cert/www.vend-x.com_crt'),
    //ca:fs.readFileSync('/etc/saas_cert/Geo-ca.crt')
};

var app          = require('express')();
var server       = server_flag === 'https'
                   ? require("https").createServer(options, app)
                   : require('http').createServer(app);
var io           = require('socket.io')(server);

//io.set("transports", ["xhr-polling"]);
//io.set('heartbeat timeout', 10);
//io.set('heartbeat interval', 4000);

//server reqeust/response
server.listen(AUCTION_PORT);

app.get('/talk', function(req, res) {
    //console.log(io.sockets);
    //io.sockets.emit("talk","testssss!");
    io.sockets.in('100').emit("talk","testssss!");
    res.send("It works!");
});

io.on('connection', function(socket){
    console.log('Connected!!!')
    
    socket.on('room', function(data) {
        console.log(data);
        socket.join(data);
    });
    socket.on('disconnect', function(){
        console.log( socket.name + ' has disconnected from the chat.' + socket.id);
    });
    
    socket.conn.on('heartbeat', function() {
        console.log('heartbeat ' + new Date().toISOString());
    });
});
