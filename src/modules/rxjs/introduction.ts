import {filter, map, publish, reduce, take} from 'rxjs/operators';
import * as RxJS from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {ConnectableObservable} from 'rxjs/internal/observable/ConnectableObservable';
import {Observer} from 'rxjs/internal/types';

const observer: Observer<number> = {
    next: x => console.log('Value: ', x),
    error: err => console.error('Error occurred: ', err),
    complete: () => console.log('Done!')
};

const alias: Observable<number> = RxJS.Observable.create((obs) => {
    obs.next(1);
    obs.next(2);
    obs.next(3);
    setTimeout(() => {
        obs.next(4);
        obs.complete();
    }, 1000);
});

console.log('Before subscribe');
alias.subscribe(observer);
console.log('After subscribe');

/*** unicast vs multicast **/
const randomNumber = new Observable<number>(obs => {
    obs.next(Math.random());
});

randomNumber.subscribe(value => console.log('1st subscription emits: ', value));
randomNumber.subscribe(value => console.log('2nd subscription emits: ', value));

const multicast = randomNumber.pipe(publish());

multicast.subscribe(value => console.log('1st subscription emits: ', value));
multicast.subscribe(value => console.log('2nd subscription emits: ', value));

/*** hot vs cold observables **/
const infinite = RxJS.interval(1000).pipe(publish()) as ConnectableObservable<number>;

infinite.connect();
setTimeout(() => infinite.subscribe(v => console.log('1st subscriber:', v)), 2000);
setTimeout(() => infinite.subscribe(v => console.log('2nd subscriber: ', v)), 3000);

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