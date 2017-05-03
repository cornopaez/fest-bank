// var http = require('http');

var pncData;
var whoAmI;
var result = "";

module.exports.set = function(data) {
	pncData = data;
};

// Find out what action it is
switch (pncData.action) {
	case "login":
		// If login, retrieve accounts for each person.
		result = "Hi " + pncData.parameters.username;
		break;
	case "who_am_i":
		if (whoAmI === "") {
			result = "A person has no name.";
		} else {
			result = pncData.parameters.username;
		}
		break;
	default:
		break;
}

exports.resultText = () => result;