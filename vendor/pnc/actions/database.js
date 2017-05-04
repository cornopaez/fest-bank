const request = require("request");
var result = {};

module.exports.getData = function() {

	request("http://mmpgh.com/API/checkBill.php?keyword=GAS&startDate=2016-05-01&endDate=2017-05-31", function (error, response, body) {
	  if (error) throw new Error(error);
	  // result = body;
	  result = JSON.parse(body);
	  // console.log("This is the raw body: " + body);
	  // console.log("The type of the database result is: " + typeof result);
	});
}

exports.getResult = () => result;