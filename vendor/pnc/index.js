const bodyParser = require('body-parser');

var pncData;
var whoAmI = "";
var result = "";
var key = "";

var database = require("./actions/database.js");
var loginService = require("./actions/login.js");
var peoplePay = require("./actions/peoplepay.js");

module.exports = {
	set: set
}

// set = function(data) {
function set(data) {

	return new Promise(function (resolve, reject) {
		// Find out what action it is
		switch (data.action) {
			case "login":
				loginService.login()
			        .then(function(loginResponse) {
			            // console.log("cool");
			            key = "Bearer " + loginResponse.token
			            result = "Hi " + data.parameters.username;
			            // console.log(result);
			            resolve(result);
			        }).catch(function(err) {
			            console.log("Login failed");
			            console.log(err);
			        });
				break;
			case "who":
				if (whoAmI === "") {
					result = "A person has no name.";
				} else {
					result = whoAmI;
				}
				break;
			case "database":
				var dates = data.parameters.date-period.split("/");
				var startDate = dates[0];
				var endDate = dates[1];
				var billType = data.parameters.billtype

				database.getData(startDate, endDate, billType)
				.then(function(databaseResponse){
					resolve(databaseResponse);
				})
				.catch(function(err) {
		            console.log("Database failed");
		            console.log(err);
		        });
				break;
			case "billpay-recent":
			case "billpay-annual":
				var dates = data.parameters["date-period"].split("/");
				var startDate = dates[0];
				var endDate = dates[1];
				var billType = data.parameters.billtype
				database.getData(startDate, endDate, billType)
				.then(function(databaseResponse){
					resolve(databaseResponse);
				})
				.catch(function(err) {
		            console.log("Database failed");
		            console.log(err);
		        });
				break;
			case "peoplepay-authenticated":
				var peoplePayParams = data.contexts[1].parameters;
				console.log(key);
				// console.log(data.contexts[1].parameters);
				peoplePay.sendPayment(peoplePayParams["unit-currency"].amount, "libbywaldron@gmail.com", key)
				.then(function(peoplePayResponse){
					if (peoplePayResponse.status !== "undefined") {
						// console.log(peoplePayParams.fulfillment);
						resolve(data.fulfillment.speech)
					} else {
						resolve("I'm sorry. Something has gone wrong. No money was transfered. Please try again.")
					}
					resolve(peoplePayResponse);
				})
				.catch(function(err) {
		            console.log("PeoplePay failed");
		            console.log(err);
		        });
				break;
			default:
				break;
		}
	});
};