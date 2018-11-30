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

const pendingPromise = new Promise<FakeHttpResponse>((resolve, reject) => {
    setTimeout(() => {
        resolve({
            code: '200',
            message: 'Promise kept!'
        });
    }, 10 * 1000);
});

console.log(pendingPromise);
setTimeout(() => console.log(pendingPromise), 10 * 1000);

const rejectedPromise = Promise.reject('I reject on purpose!');

rejectedPromise.catch((err: string) => {
    console.log('Reason of failure: ' + err);
});

async function getHisWord() {
    const keptWord = await resolveRightAway;
    console.log('Jack, ' + keptWord);
}

getHisWord();

async function getNotHisWord() {
    try {
        const keepNotHisWord = await rejectedPromise;
        console.log(keepNotHisWord);
    } catch (e) {
        console.log('Jack said: ' + e);
    }
}

getNotHisWord();