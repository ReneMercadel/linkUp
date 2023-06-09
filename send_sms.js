// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

//  TO RUN THIS PAGE: 
//  ngrok http 3000 (to connect to https://6854-174-76-80-43.ngrok.io)
//  node send_sms.js (to run on 3000)
// 
require('dotenv').config();

// required libraries for node.js
const express = require('express');
const app = express();
const port = 3000;


const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber= process.env.TWILIO_NUMBER;



// required modules for twilio response 
const client = require('twilio')(accountSid, authToken);
// const client = require('twilio')(accountSid, authToken, {
//   autoRetry: true,
//   maxRetries: 3
// });

const MessagingResponse = require('twilio').twiml.MessagingResponse;


// webhook to handle response 

app.post('/message', async (req, res) => {
  // console.log(req);
  const twiml = new MessagingResponse();
  twiml.message('this is a message from us made in node')
  res.writeHead(200,{'Content-Type': 'text/xml'});
  res.end(twiml.toString())
}); 

app.post('/message', async (req, res) => {
  // console.log(req);
  const responseObject = {
    message: "this is a test message",
    zip: '7099',
    status: 'success',
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(responseObject)); 
  console.log(responseObject); 


  // const twiml = new MessagingResponse();
  // twiml.message('this is a message from us made in node')
  // res.writeHead(200,{'Content-Type': 'text/xml'});
  // res.end(twiml.toString())
}); 


//   const findMessage = async()=>{
//   const messageListFromNumber = await client.messages.list({to: process.env.TWILIO_NUMBER});
//   const firstMessageSid = messageListFromNumber[0].sid;
//   console.log(firstMessageSid);

   
// }

// findMessage(); 




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