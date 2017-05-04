const bodyParser = require('body-parser');
var request = require("request");

var pnc = require ("../vendor/pnc/index.js")

module.exports.set = function(app) {

	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

	app.get('/', function (req, res) {
	  res.send('<p>App is up and running.</p>')
	})

	app.post('/webhook', function (req, res) {
	  // console.log(req);
	 //  console.dir(req.body.result);
	 //  var pncData = req.body.result;

	 //  pnc.set(pncData);

	 //  var response_data = {
		// 	"speech": pnc.resultText(),
		// 	"displayText": pnc.resultText(),
		// 	// "data": {},
		// 	// "contextOut": [],
		// 	"source": "FestServer",
		// 	// "followupEvent" : {}
		// };

		// // console.log(response_data);

	 //  res.set('Content-Type', 'application/json');

	 var options = { method: 'POST',
	  url: 'https://nginx0.pncapix.com/security/v1.0.0/login',
	  headers: 
	   { 
	     'cache-control': 'no-cache',
	     authorization: 'Bearer 7a088694-011e-35bb-baaf-5c6c79e33eac',
	     accept: 'application/json',
	     'content-type': 'application/json' },
	  body: { password: 'mayduncan180', username: 'mayduncan180' },
	  json: true };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(body);
	  res.send(body);
	});



	  
	})
};