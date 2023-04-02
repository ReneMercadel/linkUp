// import express from 'express';
// import bodyParser from 'body-parser';
// const app = express();
// const port = 3000;

// // const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));

// import dotenv from 'dotenv';
// // require('dotenv').config();
// dotenv.config();

// import fetch from 'node-fetch';

// import Twilio from 'twilio/lib/rest/Twilio.js';
// import MessagingResponse from 'twilio/lib/twiml/MessagingResponse.js';

// import { firebaseSeeder } from './seed.js';
// // firebaseSeeder();

// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;
// // const twilioNumber= process.env.TWILIO_NUMBER;

// // required modules for twilio response
// const client = new Twilio(accountSid, authToken);
// // const MessagingResponse = new Twilio.twiml.MessagingResponse();

// const resourceTypesObject = {
//   1: 'food',
//   2: 'shelter',
//   3: 'transportation',
//   4: 'education',
//   5: 'childcare',
//   6: 'health',
// }
 



// // test firebase get request for some food resources
// const fetchResourceData = async () => {
//   // fetch data from firebase
//   const fetchResourceData = async () => {
//     const response = await fetch(
//       'https://mutual-aid-hackathon-default-rtdb.firebaseio.com/resources.json'
//     );
//     if (!response.ok) {
//       throw new Error('Could not fetch cart data');
//     }
//     const data = await response.json();
//     return data;
//   };
// };

// // const resourceData = await fetchResourceData();

// function getResourceByType({userInput}){
//   try {
//     let resourceTypeData = [];
    

//     // filter for food resources
//     for (let key in resourceData) {
//     //   if (resourceData[key].resource === Object.keys(resourceTypesObject) || resourceTypesObject[key]) {
//         if (resourceData[key].resource === userInput.toLowerCase().charAt(0).toUpperCase()) {
//         resourceTypeData.push(resourceData[key]);
//         let currentResource = resourceData[key];
//         let resourceType = userInput.toLowerCase();
//       }
//     }

//     // grab first 4 food resources
//     resourceTypeData = resourceTypeData.slice(0, 4);

//     // format text response
//     let returnedRequestedResouces = resourceTypeData.map((resource) => {
//       return `Location: ${resource.location.latitude}, ${resource.location.longitude} \nOffered By: ${resource.offeredBy.name} \nContact: ${resource.offeredBy.phone} \nAvailable Until: ${resource.availableUntil} \n\n`;
//     });

//     let returnText = `There are ${resourceTypeData.length} ${resourceType} resources available in New Orleans near you. Here they are from closest to farthest: \n\n ${returnedRequestedResouces} \n\n If you would like to see more resources, please text 'more'}`;

//     // log text response (still need to send to user)
//     // console.log('returnText \n\n', returnText);
//     return returnText;
//   } catch (error) {
//     console.log(error);
//     };
// };


// const resourceData = await fetchResourceData();

// const currentTextResponse = await fetchResourceData();
// // console.log('foodTextResponse', foodTextResponse);




// // webhook to handle response
// app.post('/message-rene', async (req, res) => {
//   console.log(`req`, req.body.Body);
//   const twiml = new MessagingResponse();
//   // twiml.message(foodTextResponse)
//   let textResponse = req.body.Body.toLowerCase();


//   console.log(textResponse);
// //   twiml.message('Welcome to Mutual Aid New Orleans, please respond with one of the following options to recieve resouces near you:\n\n1: food\n2: shelter\n3: transportation\n4: education\n5: childcare\n6: health')
//   if (Object.values(resourceTypesObject).includes(textResponse)) {
//     let curretResourceResponse = getResourceByType(textResponse);
//     twiml.message(
//         curretResourceResponse ||
//         `There are no ${textResponse} resources available in New Orleans near you. Please try again later.`
       
//     );
//     console.log(message);
//   }
//   else if (req.body.Body == 'more' || 'MORE') {
//     twiml.message(
//       'Please respond with one of the following:\n1: food\n2: shelter\n3: transportation\n4: education\n5: childcare\n6: health'

//     )
//   };
//   // const twiml = new MessagingResponse();
// //   console.log(foodTextResponse)
//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(twiml.toString());
// });

// app.listen(3000, () => {
//   console.log('Express server listening on port 3000');
// });
