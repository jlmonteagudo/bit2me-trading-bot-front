importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDjiK6e8x7oXP4fcV8RfnEG4rlnak5VKDk',
  authDomain: 'bit2me-trading.firebaseapp.com',
  databaseURL:
    'https://bit2me-trading-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'bit2me-trading',
  storageBucket: 'bit2me-trading.appspot.com',
  messagingSenderId: '353175042330',
  appId: '1:353175042330:web:aac1063fe10bbe740d14a3',
});

const messaging = firebase.messaging();

