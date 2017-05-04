const bodyParser = require('body-parser');

var pncData;
var whoAmI = "";
var result = "";

var database = require("./actions/database.js");

module.exports.set = function(data) {
	// pncData = data;

	// Find out what action it is
	switch (data.action) {
		case "login":
			// If login, retrieve accounts for each person.

			whoAmI = data.parameters.username;
			result = "Hi " + data.parameters.username;
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
			console.log(startDate);
			console.log(endDate);
			console.log(billType);
			console.log(dates);
			database.getData(startDate, endDate, billType);
			result = database.getResult();
			break;
		case "billpay-recent":
			result = "Hey Brett. You just tried to call me but I don't want to work. Please ask later."
			break;
		case "billpay-annual":
			var dates = data.parameters["date-period"].split("/");
			var startDate = dates[0];
			var endDate = dates[1];
			var billType = data.parameters.billtype
			database.getData(startDate, endDate, billType);
			result = database.getResult();
			// while (result == "") {
			// 	require("deasync").runLoopOnce();
			// 	result = database.getResult();
			// }
			// result = "Hey Brett. You just tried to call the annual thingy- Cool."
			break;
		default:
			break;
	}
};

exports.resultText = () => result;