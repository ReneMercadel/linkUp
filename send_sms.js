// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

//  TO RUN THIS PAGE:
//  ngrok http 3000 (to connect to https://6854-174-76-80-43.ngrok.io)
//  node send_sms.js (to run on 3000)
//
require('dotenv').config();

// body parser to parse encoded message data
const bodyParser = require('body-parser');

// required libraries for node.js
const express = require('express');
const app = express();
const port = 3000;

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
// const twilioNumber= process.env.TWILIO_NUMBER;

// required modules for twilio response
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Configure body-parser middleware for urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));

// webhook to handle response
app.post('/message-rene', async (req, res) => {
  console.log(`req`, req.body.Body);

  let textResponse;
  if (req.body.Body) {
    twiml.message('this is a message from us made in node');
  }

  const twiml = new MessagingResponse();
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+18772140953',
//      to: '+15048587964'
//    })
//   .then(message => console.log(message.sid));
