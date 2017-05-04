var request = require("request");
var result = "";

module.exports.getData = function() {
	// var options = { method: 'GET',
	//   url: 'mmpgh.com/API/checkBill.php',
	// };
	// var result = "";

	request("http://mmpgh.com/API/checkBill.php?keyword=GAS&period=2017-05-01", function (error, response, body) {
	  if (error) throw new Error(error);
	  result = body;
	  console.log(body);
	});

	// return result;
}

module.getResult = () => result;