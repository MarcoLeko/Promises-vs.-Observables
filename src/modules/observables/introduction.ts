import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {filter, map, reduce, take} from 'rxjs/operators';
import * as RxJS from 'rxjs';

document.body.innerHTML += `<div class="center">
                                <input class="form-control" type="text">
                                <p id="result"></p>
                            </div>`;

const node = document.querySelector('input[type=text]');
const input$ = fromEvent(node, 'input');

input$.subscribe({
    next: event =>
        document.getElementById('result').innerText = (<HTMLInputElement> event.target).value,
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});

/*** Operators **/
const source = ['1', '2', '5', 'foo', '13', '17', 'bar'];

console.log(source);

const result = source
    .map(val => parseInt(val, 10))
    .filter(num => !isNaN(num))
    .reduce((previous: number, current: number) => previous + current);

console.log(result);

const source$ = RxJS.interval(800).pipe(
    take(7), map(val => source[val])
);

const result$ = source$.pipe(
    map(val => parseInt(val, 10)),
    filter(num => !isNaN(num)),
    reduce((previous: number, current: number) => previous + current));

source$.subscribe(res => console.log(res));
result$.subscribe(res => console.log(res));