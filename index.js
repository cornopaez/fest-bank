var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('<p>App is up and running.</p>')
})

app.post('/webhook', function (req, res) {
  console.log(req);

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

app.listen(process.env.PORT || 3000);

console.log("App running at http://localhost:" + (process.env.PORT ? process.env.PORT : 3000));