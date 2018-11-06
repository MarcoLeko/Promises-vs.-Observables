const promise = Promise.reject('Whhhhhhhooooops!');

promise.catch(err => console.log(err));