import {filter, map, reduce, take} from 'rxjs/operators';
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

const root = new Observable<string>((observer) => {
    setInterval(() => observer.next('hi'), 2000);
});

root.subscribe((val: string) => console.log(val));

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