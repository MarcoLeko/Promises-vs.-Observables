setTimeout(function() {
    console.log('second');
}, 0);

let num: number = 0;

while (num < 100000000) {
    num = num + 1;
}

console.log('first');
// first
// second

const numbers: number[] = [1, 2, 3, 4, 5, 6];

/*** Functional **/
function isEven(x): boolean {
    return x % 2 === 0;
}

const evenNumbers = numbers.filter(isEven);
console.log(evenNumbers);

/*** Classic **/
const newArr = [];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        newArr.push(numbers[i]);
    }
}

console.log(newArr);