// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

//  TO RUN THIS PAGE:
//  ngrok http 3000 (to connect to https://6854-174-76-80-43.ngrok.io)
//  node send_sms.js (to run on 3000)
//
// required libraries for node.js
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

// const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

import dotenv from 'dotenv';
// require('dotenv').config();
dotenv.config();

import fetch from 'node-fetch';

import Twilio from 'twilio/lib/rest/Twilio.js';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';

import { firebaseSeeder } from './seed.js';
// firebaseSeeder();

// Declare a variable to check how many times server has been hit

let serverHitCounter = 0;

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
// const twilioNumber= process.env.TWILIO_NUMBER;

// required modules for twilio response
const client = new Twilio(accountSid, authToken);
// const MessagingResponse = new Twilio.twiml.MessagingResponse();


 



// test firebase get request for some food resources
const fetchResourcesByType = async () => {
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
    let shelterResourceData = [];
    const sortedResourcesObject = {
      Education: [],
      ChildCare: [],
      Health: [],
      Transportation: [],
      Shelter: [],
      Food: []
    
    };

    const resourceData = await fetchResourceData();


    // filter resources based on category
    for (let key in resourceData) {
        for (const resourceType in sortedResourcesObject) {
          if (resourceData[key].resource === resourceType.toString()) {
              sortedResourcesObject[resourceType].push(resourceData[key]);
        }
        
      }

    }


    const textResponseObject = {}; 

    for (let resourceType of Object.keys(sortedResourcesObject)){
      let informationResponse = sortedResourcesObject[resourceType].slice(0,4);
      informationResponse = informationResponse.map((resource) => {
        console.log('resource \n', resource)
              return `Contact: ${resource.offeredBy.name} \nPhone Number: ${resource.offeredBy.phone} \nLocation: Location: ${resource.location.latitude}, ${resource.location.longitude}\nAvailable Until: ${resource.availableUntil} \n\n`;
        })
      let fullResourceResponse = `There are ${sortedResourcesObject[resourceType].length} ${resourceType} resources available in New Orleans near you. Here they are from closest to farthest: \n\n ${informationResponse} \n\n If you would like to see more resources, please text 'more'}`;

      textResponseObject[resourceType] = fullResourceResponse

    }
  
    // log text response (still need to send to user)
    return textResponseObject; 
    // return returnText;
  } catch (error) {
    console.log('error \n', error);
  }
};




const textResponseObject = await fetchResourcesByType();
console.log('textResponseObject.Food \n', textResponseObject.Food); 
fetchResourcesByType();



// webhook to handle response
app.post('/message-rene', async (req, res) => {
  console.log(`req`, req.body.Body);
  const twiml = new MessagingResponse();
  let textSent = req.body.Body.toLowerCase();
  let inputText = textSent.charAt(0).toUpperCase() + textSent.slice(1);
  console.log(inputText); 
console.log('text res obj || line 171',Object.keys( textResponseObject))
  if (Object.keys(textResponseObject).includes(inputText) && serverHitCounter > 0) {
    let currentresourceInfo = textResponseObject[inputText].toString();
    console.log(typeof currentresourceInfo);

    twiml.message(currentresourceInfo)

  }
  
  if (inputText == 'More' && serverHitCounter > 1 ){
    twiml.message(
      'Please respond with one of the following:\n1: food\n2: shelter\n3: transportation\n4: education\n5: childcare\n6: health'
    )


  }

  if (serverHitCounter === 0) {
    twiml.message(

      'Welcome to LinkUp NOLA! Thanks for hitting up The linkUP. Here\'s how it works (if it works). You\'ll get a text prompt and we will do our best to provide you with relevant resources. To infinity & beyond!!! (You can always text STOP to stop.) \n\n Please respond with one of the following:\n1: food\n2: shelter\n3: transportation\n4: education\n5: childcare\n6: health'
    )
  };

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
  serverHitCounter += 1;
});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
