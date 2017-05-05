'use strict';

var request = require('request');
var amount;
var person;


module.exports = {
  sendPayment: sendPayment,
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
			console.log(body);
			resolve(body);
		});

	});
}