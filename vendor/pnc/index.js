const bodyParser = require('body-parser');

var pncData;
var whoAmI = "";
var result = "";
var key = "";

var database = require("./actions/database.js");
var login = require("./actions/login.js");

module.exports.set = function(data) {
	// pncData = data;

	// Find out what action it is
	switch (data.action) {
		case "login":
			// If login, retrieve accounts for each person.
			login.login();
			key = "Bearer " + login.getKey();
			// whoAmI = data.parameters.username;
			console.log(key);
			result = "Hi " + data.parameters.username;;
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
			database.getData(startDate, endDate, billType);
			result = database.getResult();
			break;
		case "billpay-recent":
		case "billpay-annual":
			var dates = data.parameters["date-period"].split("/");
			var startDate = dates[0];
			var endDate = dates[1];
			var billType = data.parameters.billtype
			database.getData(startDate, endDate, billType);
			// console.log(result);
			result = database.getResult();
			// console.log(result);
			break;
		case "peoplepay-authenticated":

			break;
		default:
			break;
	}
};

exports.resultText = () => result;