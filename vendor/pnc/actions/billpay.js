'use strict';

var request = require('request');
var amount;
var person;


module.exports = {
  payBill: payBill,
  postTrans : postTrans
};

function payBill(amount, billerId, currentUserToken, scheduledDate){
	return new Promise(function (resolve, reject) {

		var body = '{"amount": ' + amount + ', "billerId": ' + billerId + ', "scheduledDate": "' + scheduledDate + '"}'

		var options = { method: 'POST',
			url: 'https://nginx0.pncapix.com/billpay/v1.0.0/billPay',
			headers: {
				'postman-token': '625c5086-55c3-4651-0587-32a6ad14f47e',
				'cache-control': 'no-cache',
				authorization: 'Bearer 7a088694-011e-35bb-baaf-5c6c79e33eac',
				'x-authorization': currentUserToken,
				accept: 'application/json',
				'content-type': 'application/json' 
			},
			body: body,
			json: true 
		};

		request(options, function (error, response, body) {
			if (error) reject(error);

			resolve(body);
		});

	});
}


function postTrans(amount, billerId){
	return new Promise(function (resolve, reject) {
		//Creating a date
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = yyyy+"-"+mm+"-"+dd;

		// Send to trans database
		var options = { method: 'POST',
			url: 'http://mmpgh.com/API/insertPaidBill.php',
			qs: { 
				keyword: 'business' + billerId,
				amount: amount,
				payDate: today,
				payee: billerId 
			},
			headers: {
				'cache-control': 'no-cache'
			} 
		};

		request(options, function (error, response, body) {
			if (error) reject(error);
			resolve("Transaction posted to database");
		});
	});
}
