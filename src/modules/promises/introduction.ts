const keepsHisWord = true;
const first = new Promise((resolve, reject) => {
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

const second = new Promise<FakeHttpResponse>((resolve, reject) => {
    setTimeout(() => {
        resolve({
            code: '200',
            message: 'Promise kept!'
        });
    }, 10 * 1000);
});

console.log(second);
setTimeout(() => console.log(second), 10 * 1000);