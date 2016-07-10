"use strict";

var config = require('~/config');
var key = require('~/' + config.emailSettings.apiDetailsFile);

var googleapis = require('googleapis');
var gmail = googleapis.gmail('v1');

var googleAccountManagement = {
	getAuthClient: getAuthClient,
	sendEmail: sendEmail,
	listLabels: listLabels,
};

module.exports = googleAccountManagement;

/**
 * Return a new instance of the JWT auth client
 *
 * @see - https://github.com/google/google-api-nodejs-client#using-jwt-service-tokens
 * @assumes - variable key is correctly loaded from ~/config
 * @return {Promise resolves to Google API JWT Client} - Authorizes with JWT and resolves to
 */
function getAuthClient() {

	var jwtAuthClient = new googleapis.auth.JWT(key.client_email, null, key.private_key, config.emailSettings.apiScopes, config.emailSettings.apiAccount);

	return new Promise( (resolve, reject) => {

		jwtAuthClient.authorize( (err, tokens) => {

			if (err) {
				console.log(err);
				reject(err);
			}

			resolve(jwtAuthClient);
		});
	});
}

/**
 * Send Message.
 *
 * @param {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param {String} email RFC 5322 formatted String.
 * @returns {Promose} - Resolves when the request is complete.
 */
function sendEmail(toEmail, fromEmail, subject, message) {

	var dateAsString = Date.UTC();

	//{String} email RFC 5322 formatted String
	var email = "From: " + fromEmail + " \
	To: " + toEmail + " \
	Subject: " + subject + " \
	Date: " + dateAsString + " \
	\
	" + message;

	return getAuthClient()
	.then( (auth) => {

		return new Promise( (resolve, reject) => {

			var base64EncodedEmail = btoa(email);
			gmail.users.messages.send({
				'auth': auth,
				'userId': config.emailSettings.apiAccount,
				'message': {
					'raw': base64EncodedEmail
				}
			},
			(err, response) => {

				if (err) {
					console.log('The API returned an error: ' + err);
					reject(err);
				}
				else {
					resolve(response);
				}
			});
		});
	});
}

/**
 * Lists the labels in the user's account.
 * 
 * @returns {Promise resolves Array of strings} - Resolves to return an array of email labels 
 */
function listLabels() {

	return new Promise( (resolve, reject) => {

		getAuthClient()
		.then( (auth) => {

			gmail.users.labels.list({
				auth: auth,
				userId: config.emailSettings.apiAccount,
			},
			(err, response) => {
			
				if (err) {
					console.log('The API returned an error: ' + err);
					reject(err);
				}
				else {
					resolve(response.labels);
				}
			});
		})
		.catch( (err) => {
			reject(err);
		});
	});
}