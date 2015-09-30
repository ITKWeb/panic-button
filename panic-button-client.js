//amixer cset numid=3 1

var socket = require('socket.io-client')('http://10.0.0.174:3000');
var gpio = require('pi-gpio');
var Mail = require('./mail.js');
var player = require('./mp3player.js');

var blue_pin = 37;
var green_pin = 33;
var red_pin = 35;

var closePin = function(pin,delay){
        setTimeout(function(){
            gpio.close(pin);
         }, delay);
};

closePin(blue_pin, 0);
closePin(green_pin, 0);
closePin(red_pin, 0);

socket.on('connect', function(){console.log("connect");});
socket.on('event', function(data){console.log("event");});
socket.on('disconnect', function(){console.log("disconnect");});


socket.on('panic', function(){
        gpio.open(red_pin, "output", function(err) {
                if(err) console.log('[CLIENT]:'+err);
                gpio.write(red_pin, 1);
                var mail = new Mail({to:'jeremy.flusin@itkweb.com', subject:'Panique à bord !',  text: 'C\'est la panique !!!!'});
		mail.send();		
                player.play('./resources/panic.mp3');
                closePin(red_pin, 45000);
        });
  });

  socket.on('breaktime', function(){
        gpio.open(green_pin, "output", function(err) {
                if(err) console.log('[CLIENT]:'+err);
                gpio.write(green_pin, 1);
                var mail = new Mail({to:'jeremy.flusin@itkweb.com', subject:'C\'est l\'heure de la pause !',  text: 'Arrête de bosser et va en pause !'});
		mail.send();                
		if (Math.random() < 0.5){
			player.play('./resources/breaktime01.mp3');
		}
		else{
			player.play('./resources/breaktime02.mp3');
		}
                closePin(green_pin, 60000);
        });
  });

  socket.on('standup', function(){
       gpio.open(blue_pin, "output", function(err) {
                if(err) console.log('[CLIENT]:'+err);
                gpio.write(blue_pin, 1);
                var mail = new Mail({to:'jeremy.flusin@itkweb.com', subject:'Stand-Up! !', text: 'Vérrouille ton clavier et va au stand-up !'});
                mail.send();
		if (Math.random() < 0.5) {
			player.play('./resources/standup01.mp3');
		}
		else{
			player.play('./resources/standup01.mp3');
		}
                closePin(blue_pin, 30000);
        });
  });

    socket.on('easter', function(){
       gpio.open(blue_pin, "output", function(err) {
                if(err) console.log('[CLIENT]:'+err);
                gpio.write(blue_pin, 1);
                var mail = new Mail({to:'jeremy.flusin@itkweb.com', subject:'Poussssin ! !', text: 'Gne !'});
                mail.send();
		var rand = Math.random() * 9 + 1;
		player.play('./resources/easter0'+ Math.floor(rand) +'.mp3');

                closePin(blue_pin, 5000);
        });
  });





