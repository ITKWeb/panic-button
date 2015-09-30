var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gpio = require('pi-gpio');

var buttonPort = 16;

gpio.close(buttonPort);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');


	gpio.open(buttonPort, 'input', function(err){
        	if(err) console.log(err);

        	var theirState = false;
        	var readButton = function(){
                	gpio.read(buttonPort, function(err, value){
                        	console.log(value);
                                if(err) console.log(err)
                        	if(value == 1){

                                	if(theirState) io.emit('light-off');
                                	else io.emit('light-on');
                                	theirState = !theirState;
                                	console.log('SENT MESSAGE. THEIR STATE: ', theirState);
                        	}
				else{
				}
		                setTimeout(function(){
					readButton();
				}, 500);

                	});
        	}
    		readButton();
	});
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
