// const request = require("request");
// const mysql = require('mysql')
const request = require("sync-request");
var result = "";

module.exports.getData = function(startDate, endDate, billType) {

	var url = "http://mmpgh.com/API/checkBill.php?keyword=" + billType + "&startDate=" + startDate + "&endDate=" + endDate;
	console.log(url);
	result = request("GET", url);
	console.log(result.getBody('utf8'));

}

exports.getResult = () => result.getBody('utf8');