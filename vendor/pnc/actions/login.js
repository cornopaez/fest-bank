// var http = require('http');
var request = require("request");

// {
// 	"username": "mayduncan180",
// 	"password": "mayduncan180"
// }

module.exports.login = function(user) {

	var options = { method: 'POST',
	  url: 'https://nginx0.pncapix.com/security/v1.0.0/login',
	  headers: 
	   { 'cache-control': 'no-cache',
	     authorization: 'Bearer eed8bcf9-d58f-332b-ba8b-cb4102a7588f',
	     accept: 'application/json'},
	  formData: { username: 'mayduncan180', password: 'mayduncan180' } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(body);
	});
}