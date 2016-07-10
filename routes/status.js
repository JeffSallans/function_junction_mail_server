"use strict";

const googleAccountManagement = require('~/googleAccountManagement');

const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {

	googleAccountManagement.listLabels()
	//Show Google API response
	.then((labels) => {
		res.type('application/json');
		res.status(200);
		res.send(JSON.stringify(labels));
		next();
	})
	//Failed Google API connection
	.catch((err) => {
		res.type('application/json');
		res.status(500);
		res.send(JSON.stringify(err));
		next();
	})
});

module.exports = router;