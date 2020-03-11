import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase"

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCxf6wcNJDBUIwL_yihCO9usdjD6EmgVrc",
    authDomain: "marioplanning-7f911.firebaseapp.com",
    databaseURL: "https://marioplanning-7f911.firebaseio.com",
    projectId: "marioplanning-7f911",
    storageBucket: "marioplanning-7f911.appspot.com",
    messagingSenderId: "690998467487",
    appId: "1:690998467487:web:c87c31cfd92cb37ff03baa",
    measurementId: "G-9HP9YYSHYW"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
