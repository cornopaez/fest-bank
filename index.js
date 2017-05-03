const express = require('express')
const app = express()
const controller = require ("./controller/controller.js");

controller.set(app);

app.listen(process.env.PORT || 3000);

console.log("App running at http://localhost:" + (process.env.PORT ? process.env.PORT : 3000));