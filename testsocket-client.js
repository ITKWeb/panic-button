var lightPort = 37;
var socket = require('socket.io-client')('http://10.0.0.183:3000');
var gpio = require('pi-gpio');
var Mail = require('./mail.js');

  gpio.close(lightPort);

  socket.on('connect', function(){console.log("connect");});
  socket.on('event', function(data){console.log("event");});
  socket.on('disconnect', function(){console.log("disconnect");});

  gpio.open(lightPort, "output", function(err) {
        if(err) console.log('[CLIENT]:'+err);
  	socket.on('light-on', function(){
	   gpio.write(lightPort, 1);
	   var mail = new Mail({to:'jeremy.flusin@itkweb.com', subject:'Jour !',
                                                     text: 'C\'est l\'heure de se reveiller !'});
	   mail.send();

	});
        socket.on('light-off', function(){
	   gpio.write(lightPort, 0);
	   var mail = new Mail({to:'jeremy.flusin@itkweb.com', subject:'Nuit !',
                                                     text: 'Tous au lit !'});
	   mail.send();
	});
  });


