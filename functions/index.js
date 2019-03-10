const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


const chatData = [
  {
    name: 'Машины',
    wsConnect: 8082,
    imgSrc: 'https://127.0.0.1:8081/image/car'
  },
  {
    name: 'Мода',
    wsConnect: 8083,
    imgSrc: 'https://127.0.0.1:8081/image/fashion'
  },
  {
    name: 'Здоровье',
    wsConnect: 8084,
    imgSrc: 'https://127.0.0.1:8081/image/health'
  }
];

exports.app = functions.https.onRequest((request, response) => {
  response.send(chatData);
});
