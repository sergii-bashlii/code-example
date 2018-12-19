const firebase = require("firebase/app");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyA7I8FMLHc3UW9kjI1WviJQxtQXsXnGUZQ",
  authDomain: "snappy-meridian-134123.firebaseapp.com",
  databaseURL: "https://snappy-meridian-134123.firebaseio.com",
  projectId: "snappy-meridian-134123",
  storageBucket: "snappy-meridian-134123.appspot.com",
  messagingSenderId: "593464167178",
};
const defaultApp = firebase.initializeApp(config);
const firestore = defaultApp.firestore();

firestore.settings({timestampsInSnapshots: true});

export default firestore;