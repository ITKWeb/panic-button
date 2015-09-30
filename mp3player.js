'use strict';

var exec = require('exec');

var COMMAND = "mpg321 -g 100 ";

var play = function play(filePath){
        console.log("WHATTA MAAAAAAASK !!!!");
	exec(COMMAND + filePath, function(err, out, code){
	    if (err instanceof Error)
    			throw err;
  	    process.stderr.write(err);
      	    process.stdout.write(out);
//      	    process.exit(code);
	});
};

module.exports = {
	play: play
};
