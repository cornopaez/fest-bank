'use strict';

var request = require('request');
var amount;
var person;


module.exports = {
  sendPayment: sendPayment,
  postTrans : postTrans
};

function sendPayment(amount, destinationToken, currentUserToken){
	return new Promise(function (resolve, reject) {

		var body = '{"amount": ' + amount + ', "rtpRequestId": 0, "token": "' + destinationToken + '"}'

		var options = { method: 'POST',
			url: 'https://nginx0.pncapix.com/paymentsandtransfers/v1.0.0/payment/rtp/send',
			headers: { 
				'cache-control': 'no-cache',
				authorization: 'Bearer 7a088694-011e-35bb-baaf-5c6c79e33eac',
				'x-authorization': currentUserToken,
				accept: 'application/json',
				'content-type': 'application/json' 
			},
			body: body 
		};

		request(options, function (error, response, body) {
			if (error) reject(error);
			// console.log(body);
			resolve(body);
		});

	});
}


function postTrans(amount, destinationToken){
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
				keyword: 'person',
				amount: amount,
				payDate: today,
				payee: destinationToken },
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
