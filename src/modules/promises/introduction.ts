const keepsHisWord = true;
const resolveRightAway = new Promise((resolve, reject) => {
    if (keepsHisWord) {
        resolve('Promises kept!');
    } else {
        reject('Promise NOT kept!');
    }
});

console.log(resolveRightAway);

export interface FakeHttpResponse {
    code: string;
    message: string;
}

const pendingPromise = new Promise<FakeHttpResponse>((resolve) => {
    setTimeout(() => {
        resolve({
            code: '200',
            message: 'Promise kept!'
        });
    }, 10 * 1000);
});

console.log(pendingPromise);
pendingPromise.then((fakeResponse) => console.log(fakeResponse));