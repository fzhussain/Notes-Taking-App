import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

var firebase = require('firebase');
require('firebase/firestore');

  firebase.default.initializeApp(
    {
      apiKey: "AIzaSyAMNbJnJAgF0pXOMPNjpe0l6cSTDSYRJ_k",
      authDomain: "evernote-clone-bd7d9.firebaseapp.com",
      projectId: "evernote-clone-bd7d9",
      storageBucket: "evernote-clone-bd7d9.appspot.com",
      messagingSenderId: "786406554734",
      appId: "1:786406554734:web:47dd2083d8b3c27b23fa7f",
      measurementId: "G-Y6KDBD6M1P"
    }
  );
  firebase.default.analytics();


ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
