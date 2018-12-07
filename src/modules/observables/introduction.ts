import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {filter, map, reduce, take} from 'rxjs/operators';
import * as RxJS from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';

const observable: Observable<number> = RxJS.Observable.create((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});

console.log('Before subscribe');
observable.subscribe({
    next: x => console.log('Value: ' + x),
    error: err => console.error('Something wrong occurred: ' + err),
    complete: () => console.log('Done!'),
});
console.log('After subscribe');

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