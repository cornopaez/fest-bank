const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const controller = require ("./controller/controller.js");

controller.set(app);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(process.env.PORT || 3000);

console.log("App running at http://localhost:" + (process.env.PORT ? process.env.PORT : 3000));