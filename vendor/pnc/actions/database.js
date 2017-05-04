// const request = require("request");
// const mysql = require('mysql')
const request = require("sync-request");
var result = "";

module.exports.getData = function(startDate, endDate, billType) {

	var url = "http://mmpgh.com/API/checkBill.php?keyword=" + billType + "&startDate=" + startDate + "&endDate=" + endDate;
	console.log(url);
	result = request("GET", url);
	console.log(result.getBody('utf8'));

	// console.log(url);

	// request(url, function (error, response, body) {
	//   if (error) throw new Error(error);
	//   result = body;
	//   console.log(result);
	//   console.log(url);
	//   // exports.getResult = () => result;
	// });
}

exports.getResult = () => result;