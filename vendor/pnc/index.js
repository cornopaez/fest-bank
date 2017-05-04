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
			database.getData();
			result = database.getResult();
			break;
		case "billpay-recent":
			result = "Hey Brett. You just tried to call me but I don't want to work. Please ask later."
			break;
		case "billpay-annual":
			result = "Hey Brett. You just tried to call the annual thingy- Cool."
			break;
		default:
			break;
	}
};

exports.resultText = () => result;