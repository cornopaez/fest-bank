const bodyParser = require('body-parser');

var pnc = require ("../vendor/pnc.js")

module.exports.set = function(app) {

	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

	app.get('/', function (req, res) {
	  res.send('<p>App is up and running.</p>')
	})

	app.post('/webhook', function (req, res) {
	  // console.log(req);
	  console.dir(req.body.result);
	  var pncData = req.body.result;

	  pnc.set(pncData);

	  var response_data = {
			"speech": pnc.resultText(),
			"displayText": pnc.resultText(),
			// "data": {},
			// "contextOut": [],
			"source": "FestServer",
			// "followupEvent" : {}
		};

	  res.set('Content-Type', 'application/json');

	  res.send(response_data);
	})
};