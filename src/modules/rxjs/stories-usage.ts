import {Story} from './stories';
import {catchError, concatMap, finalize, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {throwError} from 'rxjs/internal/observable/throwError';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {from} from 'rxjs/internal/observable/from';
import {Observable} from 'rxjs/internal/Observable';

/*** Execution **/

const story = new Story();

from([1, 2, 3]).pipe(
    concatMap(chapter => story.getChapter(chapter)),
    tap(result => story.spawn(result)),
    finalize(() => story.displayFinished())
).subscribe();

const observableArr: Array<Observable<any>> = [];

[1, 2, 3].forEach(chapter => observableArr.push(story.getChapter(chapter)));

forkJoin(observableArr)
    .subscribe({
        next: res => story.spawn(res),
        complete: () => story.displayFinished()
    });

from([1, 2, 3]).pipe(
    concatMap(chapter => {
        if (chapter === 3) {
            return throwError(new Error('Forced error!'));
        } else {
            return story.getChapter(chapter);
        }
    }),
    catchError((err) => {
        console.error(err);
        return of([{title: 'Fallback title', id: 101, body: 'Fallback body'}]);
    })
).subscribe({
    next: val => story.spawn(val),
    complete: () => story.displayFinished()
});