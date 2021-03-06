import {from} from 'rxjs/internal/observable/from';
import {Observable} from 'rxjs/internal/Observable';

export class HTTP {

    public makeRequest(url): Observable<any> {
        return from(fetch(url).then(response =>
            this.fakeLatency().then(() =>
                response.json()))
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