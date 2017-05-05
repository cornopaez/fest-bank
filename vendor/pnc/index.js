const bodyParser = require('body-parser');

var pncData;
var whoAmI = "";
var result = "";
var key = "";

var database = require("./actions/database.js");
var loginService = require("./actions/login.js");
var peoplePay = require("./actions/peoplepay.js");
var billPay = require("./actions/billpay.js");
var reminders = require("./actions/reminder.js");

module.exports = {
	set: set
}

// set = function(data) {
function set(data) {

	return new Promise(function (resolve, reject) {
		// Find out what action it is
		switch (data.action) {
			case "login":
				loginService.login()
			        .then(function(loginResponse) {
			            // console.log("cool");
			            key = "Bearer " + loginResponse.token
			            result = "Hi " + data.parameters["given-name"];
			            console.log("Log In success.")
			            // console.log(result);
			            resolve(result);
			        }).catch(function(err) {
			            console.log("Login failed");
			            console.log(err);
			        });
				break;

			case "who":
				if (whoAmI === "") {
					result = "A person has no name.";
				} else {
					result = whoAmI;
				}
				break;

			case "database":
				var dates = data.parameters.date-period.split("/");
				var startDate = dates[0];
				var endDate = dates[1];
				var billType = data.parameters.billtype

				database.getData(startDate, endDate, billType)
				.then(function(databaseResponse){
					console.log("Database success.")
					resolve(databaseResponse);
				})
				.catch(function(err) {
		            console.log("Database failed");
		            console.log(err);
		        });
				break;

			case "billpay-recent":
			case "billpay-annual":
				var dates = data.parameters["date-period"].split("/");
				var startDate = dates[0];
				var endDate = dates[1];
				var billType = data.parameters.billtype
				database.getData(startDate, endDate, billType)
				.then(function(databaseResponse){
					console.log("BillPay query success.")
					resolve(databaseResponse);
				})
				.catch(function(err) {
		            console.log("BillPay query failed");
		            console.log(err);
		        });
				break;

			case "peoplepay-authenticated":
				var peoplePayParams = data.contexts[1].parameters;
				// console.log(key);
				peoplePay.sendPayment(peoplePayParams["unit-currency"].amount, "libbywaldron@gmail.com", key)
				.then(function(peoplePayResponse){
					if (peoplePayResponse.status !== "undefined") {
						// console.log(peoplePayParams.fulfillment);
						resolve(data.fulfillment.speech)
						console.log("PoeplePay success.")
					} else {
						resolve("I'm sorry. Something has gone wrong. No money was transfered. Please try again.")
					}
				})
				.then(
					peoplePay.postTrans(peoplePayParams["unit-currency"].amount, "libbywaldron@gmail.com")
						.then(function(postTransResponse){
							console.log(postTransResponse);
						})
						.catch(function(error){
							console.log("Post transaction failed");
		            		console.log(error);
						})
					)
				.catch(function(err) {
		            console.log("PeoplePay failed");
		            console.log(err);
		        });
				break;

			case "billpay-authenticated":
				var billPayParams = data.contexts[0].parameters;
				var scheduledDate;
				data.contexts[0].parameters.date === "" ? scheduledDate = new Date() : scheduledDate = data.contexts[1].parameters.date;
				// console.log(key);
				billPay.payBill(billPayParams["unit-currency"].amount, 26, key, scheduledDate)
				.then(function(billPayResponse){
					if (billPayResponse.status !== "undefined") {
						// console.log(peoplePayParams.fulfillment);
						resolve(data.fulfillment.speech)
						console.log("BillPay success.")
					} else {
						resolve("I'm sorry. Something has gone wrong. I could not pay the bill. Please try again.")
					}
				})
				.then(
					billPay.postTrans(billPayParams["unit-currency"].amount, 26)
						.then(function(postTransResponse){
							console.log(postTransResponse);
						})
						.catch(function(error){
							console.log("Post transaction failed");
		            		console.log(error);
						})
					)
				.catch(function(err) {
		            console.log("BillPay failed");
		            console.log(err);
		        });
				break;

			case "billpay-auth-reminder":
				var billPayReminderParams = data.contexts[0].parameters;
				// console.log(data.contexts[0].parameters);
				var scheduledDate = billPayReminderParams.date;
				// console.log(key);
				reminders.setReminder(scheduledDate, 26)
				.then(function(remindersResponse){
					if (remindersResponse.status !== "undefined") {
						// console.log(peoplePayParams.fulfillment);
						resolve(data.fulfillment.speech)
						console.log(remindersResponse)
					} else {
						resolve("I'm sorry. Something has gone wrong. I could not set the reminder. Please try again.")
					}
				})
				.catch(function(err) {
		            console.log("Reminder setting failed");
		            console.log(err);
		        });
				break;

			default:
				resolve("Looks like something went wrong. Let's try again.");
				break;
		}
	});
};