const request = require("request");
var result = "";

module.exports.getData = function(startDate, endDate, billType) {

	var url = "http://mmpgh.com/API/checkBill.php?keyword=" + billType + "&startDate=" + startDate + "&endDate=" + endDate;
	console.log(url);

	request(url, function (error, response, body) {
	  if (error) throw new Error(error);
	  console.log(result);
	  result = body;
	});
}

exports.getResult = () => result;