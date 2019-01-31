/*** Example 1: with Promises **/
const hello: Promise<string> = new Promise(resolve =>
    setTimeout(() => resolve('Hello'), 1000)
);
const world: string = 'World';

hello
    .then(value => console.log(value, world));

/*** Example 1: with Async Await **/
async function hello2() {
    const value = await hello;
    console.log(value, world);
}

hello2();

/*** Example 2 **/
async function fn() {
    const result = await Promise.resolve('foo');
    console.log(result);
}

fn();
console.log('bar');
// bar
// foo

/*** Example 3 **/
async function fakeError() {
    try {
        const promise = await Promise.reject('Error');
        console.log(promise);
    } catch (error) {
        console.log('Upps: ', error);
    }
}

fakeError();
