var http = require('http');

module.exports.set = function(data) {
	// Find out what action it is
	switch (data.action) {
		case "login":
			// If login, retrieve accounts for each person.
			return "Hi " + data.parameters.username + "!"
			break;
		default:
			break;
	}

}