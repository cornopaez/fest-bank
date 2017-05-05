const request = require("request");
var result = "";

module.exports = {
	getData: getData
}


function getData(startDate, endDate, billType) {

	return new Promise(function (resolve, reject) {

		var options = { method: 'GET',
			url: 'http://mmpgh.com/API/checkBill.php',
			qs: { 
				keyword: 'electric',
				startDate: '2017-01-01',
				endDate: '2017-12-31' },
			headers: {
				'cache-control': 'no-cache'
			} 
		};

		request(options, function (error, response, body) {
			if (error) reject(error);

			resolve(body);
		});
	});
};