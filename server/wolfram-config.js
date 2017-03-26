var wolfram = require('wolfram-alpha').createClient('8EA3RR-JGLKVRG3X6');

var queryWolfram = function(string){
		wolfram.query("integrate 2x", function (err, result) {
		  if (err) throw err;
		  console.log("Result: %j", result);
		});
}

