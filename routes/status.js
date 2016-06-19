"use strict";

const googleAccountManagement = require('~/googleAccountManagement');
const config = require('~/config');

const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {

	let result = {
		googleAccount: config.emailSettings.to,
		googleAccountConnected: 'N/A',
		emailPrefix: config.emailSettings.subjectPrefix,
	};

	googleAccountManagement.getOauthTokenConnection()
	//Successful connection
	.then(() => {
		result.googleAccountConnected = true;
	})
	//Failed connection
	.catch((err) => {
		result.googleAccountConnected = false;
		console.log("googleAccountConnection failed: ", err);
	})
	//Send response
	.then(() => {
		res.type('application/json');
	    res.send(JSON.stringify(result));
	    next();
	});
});

module.exports = router;