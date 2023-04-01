// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config();

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


// webhook to handle response 

app.post('/message', async (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message('this is a message from us made in node')
  res.writeHead(200,{'Content-Type': 'text/xml'});
  res.end(twiml.toString())
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