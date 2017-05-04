const request = require("request");
const mysql = require('mysql')
var result = "";

module.exports.getData = function(startDate, endDate, billType) {

	// var connection = mysql.createConnection({
	//   host     : 'johnny.heliohost.org',
	//   user     : 'apifest_demo',
	//   password : 'apifest',
	//   database : 'apifest_demo'
	// });

	// connection.connect()

	// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
	//   if (err) throw err

	//   console.log('The solution is: ', rows[0].solution)
	// })

	// connection.end()

	var url = "http://mmpgh.com/API/checkBill.php?keyword=" + billType + "&startDate=" + startDate + "&endDate=" + endDate;
	console.log(url);

	request(url, function (error, response, body) {
	  if (error) throw new Error(error);
	  console.log(result);
	  console.log(url);
	  result = body;
	});
}

exports.getResult = () => result;