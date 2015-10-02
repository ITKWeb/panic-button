var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gpio = require('pi-gpio');

var blueButtonPort = 16;
var redButtonPort = 37;

gpio.close(blueButtonPort);
gpio.close(redButtonPort);

var redButtonPressed = function redButtonPressed(){
        console.log("[INFO] RED BUTTON PRESSED");
        console.log("Aleeeeeeeeeeerte ! Tous a vos postes !");
        io.emit('panic');
}

var blueButtonPressed = function blueButtonPressed(){
        console.log("[INFO] BLUE BUTTON PRESSED");
        var now = new Date();
        var hours = now.getHours() + 2;
        
        if(hours == 11 || hours == 12){
                console.log("Stand Up time !!");
                io.emit('stand-up');
        } else if (hours == 15 || hours == 16){
                console.log("Have a break, have a KitKat !");
                io.emit('breaktime');
        } else {
                console.log("A la radio il y a un coq... :)");
                io.emit('easter');
        }
}

var resetButtonsWatching = function resetButtonsWatching(){
	gpio.close(blueButtonPort);
	gpio.close(redButtonPort);
	reload();
}

var readButtons = function readButtons(){

        gpio.open(blueButtonPort, 'input', function(errBlue){

                gpio.open(redButtonPort, 'input', function(errRed) {

                        var continueWatching = true;

                        var watch = function watch() {
                                gpio.read(redButtonPort, function (err, value) {
                                        if (value == 1) {
                                                continueWatching = false;
                                                redButtonPressed();
						resetButtonsWatching();
                                                //gpio.close(blueButtonPort);
                                                //gpio.close(redButtonPort);
                                                //reload();
                                        }else{
                                                gpio.read(blueButtonPort, function (err, value) {
                                                        if (value == 1) {
                                                                continueWatching = false;
                                                                blueButtonPressed();
								resetButtonsWatching();
                                                                //gpio.close(blueButtonPort);
                                                                //gpio.close(redButtonPort);
                                                                //reload();
                                                        }
                                                });
                                        }
                                });

                                setTimeout(function(){
                                        if(continueWatching){
                                                watch();
                                        }
                                }, 500);
                        }
                        watch();
                });
        });

}

var reload = function reload(){

        try{
                setTimeout(function() {
                                console.log("[INFO] Reading...");
                                readButtons();
                        }, 5000);
        }
        catch(err){
                console.log("[WARNING]", err);
        }

}

reload();

io.on('connection', function(socket){
        console.log('[INFO] A client connected');
});

http.listen(3000, function(){
        console.log('[INFO] Websockets listening on port 3000');
});

