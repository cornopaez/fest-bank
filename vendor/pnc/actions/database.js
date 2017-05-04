const request = require("request");
var result = "";

module.exports.getData = function() {

	request("http://mmpgh.com/API/checkBill.php?keyword=GAS&startDate=2016-05-01&endDate=2017-05-31", function (error, response, body) {
	  if (error) throw new Error(error);
	  result = body;
	  console.log(body);
	});
}

exports.getResult = () => result;