'use strict';

var request = require('request');
var amount;
var person;


module.exports = {
  setReminder: setReminder
};

function setReminder(scheduledDate, billerId){
	return new Promise(function (resolve, reject) {

		// Send to trans database
		var options = { method: 'POST',
			url: 'http://mmpgh.com/API/addReminder.php',
			qs: { 
				keyword: 'business' + billerId,
				amount: amount,
				payDate: scheduledDate,
				payee: billerId 
			},
			headers: {
				'cache-control': 'no-cache'
			} 
		};

		request(options, function (error, response, body) {
			if (error) reject(error);
			resolve("Reminder posted to database");
		});
	});
}
