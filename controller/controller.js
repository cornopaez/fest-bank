module.exports.set = function(app) {
	app.get('/', function (req, res) {
	  res.send('<p>App is up and running.</p>')
	})

	app.post('/webhook', function (req, res) {
	  console.log(req[0].body);

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