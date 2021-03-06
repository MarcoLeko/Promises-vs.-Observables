/*** Example 1 **/
function h(z: string): void {
    console.log(z);
    console.log(new Error().stack); // (A)
}

function g(y: string): void {
    h(y + 'c'); // (B)
}

function f(x: string): void {
    g(x + 'b'); // (C)
}

f('a'); // (D)

/*** Example 2 **/
setTimeout(function() {
    console.log('second');
}, 10);

let num: number = 0;

while (num < 100000000) { // 100 Million  Iterations
    num = num + 1;
}

console.log('first');
// first
// second

/*** Example 3 **/
const numbers: number[] = [1, 2, 3, 4, 5, 6];

function isEven(x): boolean {
    return x % 2 === 0;
}

const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers);