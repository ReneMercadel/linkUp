// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

//  TO RUN THIS PAGE:
//  ngrok http 3000 (to connect to https://6854-174-76-80-43.ngrok.io)
//  node send_sms.js (to run on 3000)
//

// required libraries for node.js
import express from 'express';
const app = express();
const port = 3000;

import dotenv from 'dotenv';
// require('dotenv').config();
dotenv.config();

import fetch from 'node-fetch';

import Twilio from 'twilio/lib/rest/Twilio.js';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';

// import { firebaseSeeder } from './seed.js';
// firebaseSeeder();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
// const twilioNumber= process.env.TWILIO_NUMBER;

// required modules for twilio response
const client = new Twilio(accountSid, authToken);
// const MessagingResponse = new Twilio.twiml.MessagingResponse();

// test firebase get request for some food resources
const fetchFoodResources = async () => {
  // fetch data from firebase
  const fetchResourceData = async () => {
    const response = await fetch(
      'https://mutual-aid-hackathon-default-rtdb.firebaseio.com/resources.json'
    );
    if (!response.ok) {
      throw new Error('Could not fetch cart data');
    }
    const data = await response.json();
    return data;
  };

  try {
    let foodResourceData = [];
    const resourceData = await fetchResourceData();

    // filter for food resources
    for (let key in resourceData) {
      if (resourceData[key].resource === 'Food') {
        foodResourceData.push(resourceData[key]);
      }
    }

    // grab first 4 food resources
    foodResourceData = foodResourceData.slice(0, 4);

    // format text response
    let returnedFoodReesources = foodResourceData.map((resource) => {
      return `Location: ${resource.location.latitude}, ${resource.location.longitude} \nOffered By: ${resource.offeredBy.name} \nContact: ${resource.offeredBy.phone} \nAvailable Until: ${resource.availableUntil} \n\n`;
    });

    let returnText = `There are ${foodResourceData.length} food resources available in New Orleans near you. Here they are from closest to farthest: \n\n ${returnedFoodReesources} \n\n If you would like to see more resources, please text 'more'}`;

    // log text response (still need to send to user)
    // console.log('returnText \n\n', returnText);
    return returnText;
  } catch (error) {
    console.log(error);
  }
};

const foodTextResponse = await fetchFoodResources();
console.log('foodTextResponse', foodTextResponse);

// webhook to handle response
app.post('/message-rene', async (req, res) => {
  console.log(`req`, req.body);
  let textResponse;
  if (req.body.Body === 'food' || req.body.Body === 'Food') {
    twiml.message(
      foodTextResponse ||
        'There are no food resources available in New Orleans near you. Please try again later.'
    );
  }
  const twiml = new MessagingResponse();
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
