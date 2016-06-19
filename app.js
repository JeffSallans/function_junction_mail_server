"use strict";

// Import
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Init express
//app.use work like a waterfall, for each request each .use is called in order
// until res.send() is called
var app = express();

//___ Additional Settings ___
// Log apache messages to STDOUT
app.use(logger('dev'));
// parse application/json 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//___ API Call ___

//___ Setup Routes ___
// Define main routes

var status = require(path.join(__dirname, 'routes', 'status'));
app.use('/status', status);

//var sendMail = require(path.join(__dirname, 'routes', 'sendMail'));
//app.use('/mail/send', sendMail);

//___ 404 ___
// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//___ Error Handlers ___

//If there is an error during the request res function would
// be skipped and the logic falls to this function
app.use((err, req, res, next) => {
	handleError(res, err);
});


module.exports = app;

/*
 * Send back a 500 error
 */
function handleError(res, error) {

	// development error handler
	// will print stacktrace
	var stacktrace = {};
	if (app.get('env') === 'development') {
		stacktrace = error;
	}

	res.send(error.status || 500, {
		error: error.message,
		stacktrace: stacktrace
	});
}
