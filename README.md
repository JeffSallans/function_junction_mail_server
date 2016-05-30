# function_junction_mail_server
A simple server for sending emails by a REST call.  Uses the google API, express.js, and node.js.

## Install

1) Pull this repository

2) Install all npm modules
```
$ npm install
```
3) Create ./client_secret.json with Google API OAuth data for CLI

Follow the process at https://developers.google.com/gmail/api/quickstart/nodejs#step_1_turn_on_the_api_name

## Deployment

1) Navigate to project directory
```
//npm start defined in package.json
//Actual command is node --harmony ./bin/www
//Harmony flag enables staged ES6 features
$ npm start
```

2) Follow command line setups to authenticate with Google API

3) Send REST API requests to [localhost:3000](http://localhost:3000)

4) (Optional) Test request [GET localhost:3000/status](http://localhost:3000/status)

## To Do

- [x] Google API prototype
- [ ] Express endpoint setup
- [ ] Google API send email
- [ ] Convert email settings to configuration driven for multiple purposes

## Contributors

[Jeff Sallans](https://github.com/JeffSallans)

## License

[Apache License 2.0](http://tldrlegal.com/license/apache-license-2.0-(apache-2.0))