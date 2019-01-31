/*** Example 1: with Callbacks **/
function getA(callback) {
    return setTimeout(() => callback('a'), 100);
}

function getB(callback) {
    return setTimeout(() => callback('b'), 200);
}

function getC(callback) {
    return setTimeout(() => callback('c'), 300);
}

getA(a =>
    getB(b =>
        getC(c => console.log(a + b + c))
    )
);

/*** Example1: with Promises **/
// function getA(): Promise<string> {
//     return new Promise(resolve =>
//         setTimeout(() => resolve('a'), 100));
// }
//
// function getB(): Promise<string> {
//     return new Promise(resolve =>
//         setTimeout(() => resolve('b'), 100));
// }
//
// function getC(): Promise<string> {
//     return new Promise(resolve =>
//         setTimeout(() => resolve('c'), 100));
// }
//
// getA()
//     .then((a: string) => getB().then(b => a + b))
//     .then((ab: string) => getC().then(c => ab + c))
//     .then((result: string) => console.log(result));

/*** Example2 **/
export interface FakeHttpResponse {
    code: string;
    message: string;
}

const rejectedPromise = new Promise<FakeHttpResponse>((resolve, reject) => {
    setTimeout(() => {
        reject({
            code: '404',
            message: 'Not Found!'
        });
    }, 1000);
});

rejectedPromise.catch((fakeResponse) => {
    console.log(fakeResponse);
    console.log(rejectedPromise);
});