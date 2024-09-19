import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDaXc_ilzwXwt7fI5OfYtli4RFidrhmlNY",
    authDomain: "myproject-4e193.firebaseapp.com",
    databaseURL: "https://myproject-4e193-default-rtdb.firebaseio.com",
    projectId: "myproject-4e193",
    storageBucket: "myproject-4e193.appspot.com",
    messagingSenderId: "219634886504",
    appId: "1:219634886504:web:eef348edc360b8267918dd",
    measurementId: "G-5MGC2QZLP4"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
