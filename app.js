const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const port = process.env.PORT || 3000;
const app = express();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// current date
// adjust 0 before single digit date




/*var twilio = require('twilio');



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
  console.log('hey')
  twiml.message("hey");

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(port, () => {
  console.log('Express server listening on port 1337');
});
