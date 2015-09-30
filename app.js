var FRIEND_ADDRESS = "10.0.0.183";
var SOCKET_PORT = 5000;
var myColor="blue";
var theirColor="red";

var lightPort = 37;
var buttonPort = 16;

var gpio = require('pi-gpio');


io.sockets.on('connection', function (socket) {
  console.log('connected');
  socket.on('light-'+ myColor +'-on', function () {
	gpio.open(lightPort, 'output', function(err){
                if(err) console.log(err);
		gpio.write(lightPort, 1, function(){
			gpio.close(lightPort);
		});	
	});	
  });
  socket.on('light-'+ myColor +'-off', function () {
	gpio.open(lightPort, 'output', function(err){
                if(err) console.log(err);
		gpio.write(lightPort, 0, function(){
			gpio.close(lightPort);
		});	
	});	
  });
  
  gpio.open(buttonPort, 'input', function(err){
  	if(err) console.log(err);

	var theirState = false;
        var readButton = function(){
                console.log("coucou");
		gpio.read(buttonPort, function(err, value){
			if(err) console.log(err)
			else console.log(value);
			if(value == 1){

		        	if(theirState) socket.emit('light-'+ theirColor + '-off');
        			else socket.emit('light-'+ theirColor + '-on');
			        theirState = !theirState;
                                console.log('SENT MESSAGE. THEIR STATE: ', theirState);
			}
		});
		readButton();
	}
    readButton();	
    });
});
