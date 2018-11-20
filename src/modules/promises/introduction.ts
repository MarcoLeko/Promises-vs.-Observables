const keepsHisWord = true;
const first = new Promise(function(resolve, reject) {
    if (keepsHisWord) {
        resolve('Promises kept!');
    } else {
        reject('Promise NOT kept!');
    }
});

console.log(first);

export interface FakeHttpResponse {
    code: string;
    message: string;
}

const second = new Promise<FakeHttpResponse>(function(resolve, reject) {
    setTimeout(() => {
        resolve({
            code: '200',
            message: 'Promise kept!'
        });
    }, 10 * 1000);
});

console.log(second);
setTimeout(() => console.log(second), 10 * 1000);

const third = Promise.reject('I reject on purpose!');

third.catch(function(err: string) {
    console.log('Reason of failure: ' + err);
});