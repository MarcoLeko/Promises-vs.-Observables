import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDBBv337-uPlzBzFIJe-pB285o7Q6qusz4',
    authDomain: 'promises-vs-observables.firebaseapp.com',
    databaseURL: 'https://promises-vs-observables.firebaseio.com',
    projectId: 'promises-vs-observables',
    storageBucket: 'promises-vs-observables.appspot.com',
    messagingSenderId: '504886896137'
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth: firebase.auth.Auth = app.auth();
export const firestore: firebase.firestore.Firestore = app.firestore();
export const storage: firebase.storage.Storage = app.storage();

const settings = {timestampsInSnapshots: true};
app.firestore().settings(settings);