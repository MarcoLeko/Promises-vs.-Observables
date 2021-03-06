import * as RxJS from 'rxjs';
import {from} from 'rxjs/internal/observable/from';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map, publish, reduce, shareReplay} from 'rxjs/operators';
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

const multicast = randomNumber.pipe(shareReplay());

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


const subjectAsObserver = new RxJS.Subject();

subjectAsObserver.subscribe(v1 => console.log('ObserverA: ', v1));
subjectAsObserver.subscribe(v2 => console.log('ObserverB: ', v2));

const source$ = RxJS.from([1, 2, 3]);
source$.subscribe(subjectAsObserver);