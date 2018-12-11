import {filter, map, publish, reduce, refCount, shareReplay, take} from 'rxjs/operators';
import * as RxJS from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';

const alias: Observable<number> = RxJS.Observable.create((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});

console.log('Before subscribe');
alias.subscribe({
    next: x => console.log('Value: ' + x),
    error: err => console.error('Error occurred: ' + err),
    complete: () => console.log('Done!'),
});
console.log('After subscribe');

/*** unicast vs multicast **/
const root = new Observable<string>((observer) => {
    setInterval(() => observer.next('hi'), 2000);
});

root.subscribe((val: string) => console.log(val));

const randomNumber = new Observable<number>(observer => {
    observer.next(Math.random());
});

const multicast = randomNumber.pipe(shareReplay());

multicast.subscribe(value => console.log('First subscription emits: ' + value));
multicast.subscribe(value => console.log('Second subscription emits: ' + value));

/*** hot vs cold observables **/
const obs = RxJS.interval(1000).pipe(publish(), refCount());

obs.subscribe(v => console.log('1st subscriber:' + v));
setTimeout(() => obs.subscribe(v => console.log('2nd subscriber:' + v)), 1100);

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