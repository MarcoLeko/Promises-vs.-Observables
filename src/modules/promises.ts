import {Promise} from 'es6-promise';

const promise = Promise.reject('Whhhhhhhooooops!');

promise.catch(err => console.log(err));