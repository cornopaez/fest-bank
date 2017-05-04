const request = require("request");
var result = {};

module.exports.getData = function(startDate, endDate, billType) {

	request("http://mmpgh.com/API/checkBill.php?keyword=" + billType + "&startDate=" + startDate + "&endDate=" + endDate, function (error, response, body) {
	  if (error) throw new Error(error);
	  result = body;
	});
}

exports.getResult = () => result;