import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyA3_7kx3zp-sX5LcHYalT3R6t9FFy6BWhI",
    authDomain: "ladiescab-ac117.firebaseapp.com",
    projectId: "ladiescab-ac117",
    storageBucket: "ladiescab-ac117.appspot.com",
    messagingSenderId: "671886575579",
    appId: "1:671886575579:web:d3cfafb5dcd4f8d79a89fe",
    measurementId: "G-P99Y0N4PB1",
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}