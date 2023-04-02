// const faker = require('faker');
import { faker } from '@faker-js/faker';

const seedArr = [];

const resourceArray = [
  'Food',
  'Shelter',
  'Transportation',
  'Education',
  'Childcare',
  'Health'
];

const nolaBoundaries = {
  minLatitude: 29.89,
  maxLatitude: 30.07,
  minLongitude: -90.14,
  maxLongitude: -89.88,
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateRandomLocationsInNola = () => {
  const latitude = getRandomNumber(
    nolaBoundaries.minLatitude,
    nolaBoundaries.maxLatitude
  );
  const longitude = getRandomNumber(
    nolaBoundaries.minLongitude,
    nolaBoundaries.maxLongitude
  );

  return {
    latitude,
    longitude,
  };
};

const createFakeResource = () => {
  return {
    resource: resourceArray[Math.floor(Math.random() * resourceArray.length)],
    location: generateRandomLocationsInNola(),
    offeredBy: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    },
    availableUntil: faker.date.future(),
  };
};

export const firebaseSeeder = async () => {
  for (let i = 0; i < 100; i++) {
    fetch(
      'https://mutual-aid-hackathon-default-rtdb.firebaseio.com/resources.json',
      {
        method: 'POST',
        body: JSON.stringify(createFakeResource()),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const fakeResource = createFakeResource();
    console.log(fakeResource);
    seedArr.push(fakeResource);
  }
};

console.log(seedArr);
