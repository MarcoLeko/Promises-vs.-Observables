const keepsHisWord = true;
const promise = new Promise((resolve, reject) => {
    if (keepsHisWord) {
        resolve('Promises kept!');
    } else {
        reject('Promise NOT kept!');
    }
});

console.log(promise);

export interface FakeHttpResponse {
    code: string;
    message: string;
}

const scndPromise = new Promise<FakeHttpResponse>((resolve, reject) => {
    setTimeout(() => {
        resolve({
            code: '200',
            message: 'Promise kept!'
        });
    }, 10 * 1000);
});

console.log(scndPromise);
setTimeout(() => console.log(scndPromise), 10 * 1000);