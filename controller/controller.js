const bodyParser = require('body-parser');
var request = require("request");

var pnc = require ("../vendor/pnc/index.js")

module.exports = {
	set: set
}


function set(app) {

	var response_data;

	return new Promise(function (resolve, reject) {

		var speech = "";

		app.use(bodyParser.json()); // support json encoded bodies
		app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

		app.get('/', function (req, res) {
		  res.send('<p>App is up and running.</p>')
		});

		app.post('/webhook', function (req, res) {
		  // console.log(req);
		  	// console.dir(req.body.result);
		  	var pncData = req.body.result;

		  	pnc.set(pncData)
		  	.then(function(pncResponse){

				response_data = {
					"speech": pncResponse,
					"displayText": pncResponse,
					// "data": {},
					// "contextOut": [],
					"source": "FestServer",
					// "followupEvent" : {}
				};

		  		// console.log(response_data);

		  		res.set('Content-Type', 'application/json');

				res.send(response_data);
		  	})
		  	.catch(function(err) {
				console.log("pncResponse failed");
				console.log(err);
			});
	  
		});
	});
};