'use strict';

var request = require('request');


module.exports = {
  login: login
};

/**
 * Gets the answer to the User question from the ai
 *
 * @param question
 * @returns {Promise}
 */
function login(){

	return new Promise(function (resolve, reject) {
		/*
		request.post({
		  headers: {'content-type' : 'application/x-www-form-urlencoded'},
		  url: aiConfig.url,
		  form: {
		        user_question: question
		   },
		  
		}, function(error, response, body){
			    if (error) {
		            console.log(error);
		            reject(err);
		        } else {
		            console.log(body);
		            resolve(body);    
				}	
		});
		*/

		var options = { method: 'POST',
		  url: 'https://nginx0.pncapix.com/security/v1.0.0/login',
		  headers: 
		   { 
		     'cache-control': 'no-cache',
		     authorization: 'Bearer 7a088694-011e-35bb-baaf-5c6c79e33eac',
		     accept: 'application/json',
		     'content-type': 'application/json' },
		  body: { password: 'mayduncan180', username: 'mayduncan180' },
		  json: true };

		request(options, function (error, response, body) {
		  if (error) reject(error);

		  console.log(body);
		  resolve(body);  
		});

		
	});
}