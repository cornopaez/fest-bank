// var http = require('http');
const request = require("sync-request");
var result;

// {"username": "mayduncan180","password": "mayduncan180"}

module.exports.login = function() {

	var url = "https://nginx0.pncapix.com/security/v1.0.0/login?username=mayduncan180&password=mayduncan180"
	var options = {
		headers: { 
			'cache-control': 'no-cache',
			authorization: 'Bearer 7a088694-011e-35bb-baaf-5c6c79e33eac',
			accept: 'application/json'
		},
	};

	result = request("post", url, options);
	console.log(result.getBody('utf8'));
}

exports.getKey = () => JSON.parse(result.getBody('utf8'));