var request = require("request");
var result = "";

module.exports.getData = function() {

	request("http://mmpgh.com/API/checkBill.php?keyword=GAS&period=2017-05-01", function (error, response, body) {
	  if (error) throw new Error(error);
	  result = body;
	  console.log(body);
	});
}

module.getResult = () => result;