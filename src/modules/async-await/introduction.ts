const hello: Promise<string> = new Promise(resolve =>
    setTimeout(() => resolve('Hello'), 1000)
);
const world: string = 'World';

hello
    .then(value => console.log(value, world));

async function hello2() {
    const value = await hello;
    console.log(value, world);
}

hello2();

async function helloWorldFailure() {
    try {
        const failure = await Promise.reject('Error');
        console.log(failure, world);
    } catch (error) {
        console.log(error, world + ' should be: Hello', world);
    }
}

helloWorldFailure();