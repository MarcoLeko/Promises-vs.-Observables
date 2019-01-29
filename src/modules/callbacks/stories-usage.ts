import {catchError, displayFinished, getAllChapters, getChapter, spawn} from './stories';

/*** Execution **/

getAllChapters(function(response) {
    spawn(response);
    displayFinished();
});

console.log('before execution');
getChapter(1, function(response1) {
    spawn(response1);
    getChapter(2, function(response2) {
        spawn(response2);
        getChapter(3, function(response3) {
            spawn(response3);
            displayFinished();
        });
    });
});
console.log('after execution');


getChapter(1, response1 => { // (*)
    spawn(response1);
    getChapter(2, response2 => { // (**)
        spawn(response2);
        getChapter(3, response3 => { // (***)
            spawn(response3);
            displayFinished();
        }, err3 => catchError(err3)); // (***)
    }, err2 => catchError(err2)); // (**)
}, err1 => catchError(err1)); // (*)