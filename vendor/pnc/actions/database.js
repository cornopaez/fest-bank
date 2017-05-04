// const request = require("request");
// const mysql = require('mysql')
const request = require("sync-request");
var result = "";

module.exports.getData = function(startDate, endDate, billType) {

	// var connection = mysql.createConnection({
	//   host     : 'johnny.heliohost.org',
	//   user     : 'apifest_demo',
	//   password : 'apifest',
	//   database : 'apifest_demo'
	// });

	// connection.connect()

	// var query = "SELECT `PAYEE`, `DATE` , `AMOUNT` FROM `BILLS_PAID` WHERE `KEYWORD` = '" + billType + "' and `DATE` >= DATE(" + startDate + ") and `DATE` <= DATE(" + endDate + ")"

	// connection.query(query, function (err, rows, fields) {
	//   if (err) throw err
	//   	// var temp = ""
	//   console.log('The solution is: ' + rows[0].payee)
	// })

	// connection.end()

	var url = "http://mmpgh.com/API/checkBill.php?keyword=" + billType + "&startDate=" + startDate + "&endDate=" + endDate;
	console.log(url);
	result = request("GET", url);
	console.log(result);

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