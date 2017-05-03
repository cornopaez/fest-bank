// var http = require('http');

var pncData;

module.exports.set = function(data) {
	pncData = data;
};

// // Find out what action it is
// switch (pncData.action) {
// 	case "login":
// 		// If login, retrieve accounts for each person.
// 		break;
// 	default:
// 		break;
// }

exports.resultText = () => "Hi" + pncData.parameters.username;