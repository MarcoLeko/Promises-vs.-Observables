export class HTTP {

    public makeRequest(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = () => {
                if (req.status === 200) {
                    this.fakeLatency()
                        .then(() => resolve(req.response));
                } else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = () => {
                reject(Error('Network Error'));
            };

            req.send();
        });
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
        this.spinnerElement = createElm(`<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
             </svg>`);
    }

    public static createElement(innerHTML: string): HTMLElement {
        const div = document.createElement('div');
        div.innerHTML = innerHTML;
        document.body.appendChild(div);
        return div;
    }
    public getAllStories(): Promise<string> {
        return this.http.makeRequest(Story.BASE_URL);
    }

    public getChapter(chapter: number): Promise<string> {
        return this.http.makeRequest(Story.BASE_URL + chapter.toString());
    }

    public spawn(content): void {
        content = JSON.parse(content);

        if (content instanceof Array === false) {
            content = [content];
        }

        content.forEach(elm => {
            const storySnippet = document.createElement('div');
            storySnippet.innerHTML = `<h1>${elm.title}</h1>
                                      <div class="story-info">
                                          <i>ID: Post-${elm.id}</i>
                                      </div>
                                      <p>${elm.body}.</p>`;

            document.body.insertBefore(storySnippet, this.spinnerElement);
        });

    }

    public displayFinished(): void {
        this.spinnerElement.style.display = 'none';
        Story.createElement('<div>All done!</div>');
    }
}

/*** Execution **/
const story = new Story();

story.getAllStories()
    .then((response: XMLHttpRequestResponseType) => story.spawn(response))
    .finally(() => {
        story.displayFinished();
    });

story.getChapter(1).then((response1: XMLHttpRequestResponseType) => // (*)
    story.spawn(response1)
).then(() => // (**)
    story.getChapter(2).then((response2: XMLHttpRequestResponseType) => story.spawn(response2))
).then(() => // (***)
    story.getChapter(3).then((response3: XMLHttpRequestResponseType) => story.spawn(response3))
).finally(() =>  // (****)
    story.displayFinished()
);

const chapters: Array<Promise<string>> = [];

for (const n of [1, 2, 3]) {
    chapters.push(story.getChapter(n));
}

Promise.all(chapters).then((response) =>
    story.spawn(response)
).finally(() =>
    story.displayFinished()
);

Promise.race(chapters).then((response) =>
    story.spawn(response)
).finally(() =>
    story.displayFinished()
);