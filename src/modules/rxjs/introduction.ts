import * as RxJS from 'rxjs';
import {async} from 'rxjs/internal/scheduler/async';
import {from} from 'rxjs/internal/observable/from';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map, observeOn, publish, reduce} from 'rxjs/operators';
import {Observer} from 'rxjs/internal/types';
import {ConnectableObservable} from 'rxjs/internal/observable/ConnectableObservable';

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
function multiplyByTen(input: Observable<number>): Observable<number> {
    return RxJS.Observable.create(function subscribe(obs) {
        input.subscribe(val => obs.next(val * 10),
            err => obs.error(err),
            () => obs.complete()
        );
    });
}

const observable = from([1, 2, 3, 4]);
const output = multiplyByTen(observable);
output.subscribe(res => console.log(res));

const source = ['1', '2', '5', 'foo', '13', '17', 'bar'];

console.log(source);

const result = source
    .map(val => parseInt(val, 10))
    .filter(num => !isNaN(num))
    .reduce((previous: number, current: number) => previous + current);

console.log(result);

const result$ = from(source).pipe(
    map(val => parseInt(val, 10)),
    filter(num => !isNaN(num)),
    reduce((previous: number, current: number) => previous + current));

result$.subscribe(res => console.log(res));

/*** Subjects **/
const subject = new RxJS.Subject();

subject.subscribe({
    next: (v) => console.log('observerA: ', v)
});
subject.subscribe({
    next: (v) => console.log('observerB: ', v)
});

subject.next(1);
subject.next(2);

const behaviour = new RxJS.BehaviorSubject(0);

behaviour.subscribe({
    next: (v) => console.log('observerA: ', v)
});

behaviour.next(1);
behaviour.next(2);

behaviour.subscribe({
    next: (v) => console.log('observerB: ', v)
});

behaviour.next(3);

const replay = new RxJS.ReplaySubject(3);

replay.subscribe({
    next: (v) => console.log('observerA: ', v)
});

replay.next(1);
replay.next(2);
replay.next(3);
replay.next(4);

replay.subscribe({
    next: (v) => console.log('observerB: ', v)
});

replay.next(5);

const asyncSubject = new RxJS.AsyncSubject();

asyncSubject.subscribe({
    next: (v) => console.log('observerA: ', v)
});

asyncSubject.next(1);
asyncSubject.next(2);
asyncSubject.complete();

/*** Schedulers **/

const scheduled = RxJS.Observable.create((obs) => {
    obs.next(1);
    obs.next(2);
    obs.next(3);
    obs.complete();
}).pipe(observeOn(async));

console.log('just before subscribe');
scheduled.subscribe(observer);
console.log('just after subscribe');