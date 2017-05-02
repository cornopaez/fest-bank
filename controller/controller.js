const bodyParser = require('body-parser');

module.exports.set = function(app) {

	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

	app.get('/', function (req, res) {
	  res.send('<p>App is up and running.</p>')
	})

	app.post('/webhook', function (req, res) {
	  // console.log(req);
	  console.dir(req.body.result.parameters);

	  var response_data = {
			"speech": "This is a response from the backend.",
			"displayText": "This is a response from the backend.",
			// "data": {},
			// "contextOut": [],
			"source": "FestServer",
			// "followupEvent" : {}
		};

	  res.set('Content-Type', 'application/json');

	  res.send(response_data);
	})
};