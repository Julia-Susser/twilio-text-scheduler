const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const port = process.env.PORT || 3000;
const app = express();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const cal = require('./coming-up.js')(app)
// current date
// adjust 0 before single digit date




/*var twilio = require('twilio');

var accountSid = 'ACba12b2496ef12926253f813be8e1876a'; // Your Account SID from www.twilio.com/console
var authToken = '28bde1e4f5baba87087e579cd3706ddf';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Fuck You!',
    to: '4154056458',  // Text this number
    from: '+12162386619' // From a valid Twilio number
})
.then((message) => console.log(message.sid));*/













app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message(message);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(port, () => {
  console.log('Express server listening on port 1337');
});
