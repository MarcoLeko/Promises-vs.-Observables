function h(z: string): void {
    console.log(z); // (A)
    console.log(new Error().stack); // (A)
}

function g(y: string): void {
    h(y + 'c'); // (B)
}

function f(x: string): void {
    g(x + 'b'); // (C)
}
f('a'); // (D)

setTimeout(function() {
    console.log('second');
}, 10);

let num: number = 0;

while (num < 100000000) {
    num = num + 1;
}

console.log('first');
// first
// second

const numbers: number[] = [1, 2, 3, 4, 5, 6];

function isEven(x): boolean {
    return x % 2 === 0;
}

const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers);