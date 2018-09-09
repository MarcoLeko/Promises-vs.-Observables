import * as firebase from 'firebase/app';
const firebaseConfig = {
    apiKey: 'AIzaSyDBBv337-uPlzBzFIJe-pB285o7Q6qusz4',
    authDomain: 'promises-vs-observables.firebaseapp.com',
    databaseURL: 'https://promises-vs-observables.firebaseio.com',
    projectId: 'promises-vs-observables',
    storageBucket: 'promises-vs-observables.appspot.com',
    messagingSenderId: '504886896137'
};
export const app = firebase.initializeApp(firebaseConfig);

