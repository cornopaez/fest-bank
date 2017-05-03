// var http = require('http');

var pncData;
var whoAmI = "";
var result = "";

module.exports.set = function(data) {
	pncData = data;

	// Find out what action it is
	switch (pncData.action) {
		case "login":
			// If login, retrieve accounts for each person.
			whoAmI = pncData.parameters.username;
			result = "Hi " + pncData.parameters.username;
			break;
		case "who":
			if (whoAmI === "") {
				result = "A person has no name.";
			} else {
				result = whoAmI;
			}
			break;
		default:
			break;
	}
};

exports.resultText = () => result;