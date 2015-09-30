var gpio = require("pi-gpio");



var port = 37;

var value = 1;

var delay = 50;

var duration = 5000;

gpio.close(port);

var switchLight = function(){
  value = (value == 1) ? 0:1;
  
  gpio.write(port, value, function(){
	
	console.log(port, value);
  	setTimeout(function(){
		switchLight()
	}, delay);
  });
}


gpio.open(port, "output", function(err) {
    if(err) console.log(err);	
    switchLight();
});
