// var http = require('http');
const request = require("sync-request");
var result;

// {"username": "mayduncan180","password": "mayduncan180"}

module.exports.login = function() {

	var url = "https://nginx0.pncapix.com/security/v1.0.0/login?username=mayduncan180&password=mayduncan180"
	var options = {
		headers: { 
			'cache-control': 'no-cache',
			authorization: 'Bearer 0e66dbb9-fc92-3082-9870-7106c631ff65',
			accept: 'application/json'
		},
	};

	result = request("post", url, options);
	console.log(result.getBody('utf8'));
}

exports.getKey = () => JSON.parse(result.getBody('utf8'));