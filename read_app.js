var gpio = require("pi-gpio");

var port = 16;

var read = false;

var readedValue;

gpio.close(port);

var readValue = function(){
	gpio.read(port, function(err, value){
		if(err) console.log(err);
		readedValue = value;	
		if(readedValue == 0)readValue();
		else		console.log(readedValue);

	});	
};


gpio.open(port, "input", function(err){
	if(err) console.log(err);
	readValue();
});
