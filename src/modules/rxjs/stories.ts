import {from} from 'rxjs/internal/observable/from';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, concatMap, finalize, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {throwError} from 'rxjs/internal/observable/throwError';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';

export class HTTP {

    public makeRequest(url): Observable<any> {
        return from(new Promise((resolve, reject) => {
                const req = new XMLHttpRequest();
                req.open('GET', url);

                req.onload = () => {
                    if (req.status === 200) {
                        this.fakeLatency().then(() => resolve(JSON.parse(req.response)));
                    } else {
                        reject(Error(req.statusText));
                    }
                };

                req.onerror = () => {
                    reject(Error('Network Error'));
                };

                req.send();
            })
        );
    }

    private fakeLatency() {
        return new Promise((resolve) =>
            setTimeout(resolve, 3000 * Math.random()));
    }
}

export class Story {

    public static BASE_URL = 'https://jsonplaceholder.typicode.com/posts/';
    public spinnerElement: HTMLElement;

    public http: HTTP = new HTTP();

    constructor() {
        this.spinnerElement = Story.createElm(`<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
             </svg>`);
    }

    public static createElm(innerHTML: string): HTMLElement {
        const div = document.createElement('div');
        div.innerHTML = innerHTML;
        document.body.appendChild(div);
        return div;
    }

    public getAllStories(): Observable<any> {
        return this.http.makeRequest(Story.BASE_URL);
    }

    public getChapter(chapter: number): Observable<any> {
        return this.http.makeRequest(Story.BASE_URL + chapter.toString());
    }

    public spawn(content): void {
        if (content instanceof Array === false) {
            content = [content];
        }

        content.forEach(elm => {
            const snippet = document.createElement('div');
            snippet.innerHTML = `<h1>${elm.title}</h1>
                                 <div class="story-info">
                                     <i>ID: Post-${elm.id}</i>
                                 </div>
                                 <p>${elm.body}.</p>`;

            document.body.insertBefore(snippet, this.spinnerElement);
        });

    }

    public displayFinished(): void {
        this.spinnerElement.style.display = 'none';
        Story.createElm('All done!');
    }
}

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