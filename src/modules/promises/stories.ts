export class HTTP {

    public makeRequest(url: string): Promise<XMLHttpRequestResponseType | string> {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = () => {
                if (req.status === 200) {
                    this.fakeLatency(3000 * Math.random())
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

    private fakeLatency(ms: number) {
        return new Promise((resolve) =>
            setTimeout(resolve, ms));
    }
}

class Story extends HTTP {

    public static BASE_URL = 'https://jsonplaceholder.typicode.com/';
    public spinnerElement: HTMLElement = document.createElement('div');
    public storyElement: HTMLElement = document.createElement('div');

    constructor() {
        super();
        this.spinnerElement.innerHTML =
            `<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
             </svg>`;
    }

    public getAllStories(): Promise<XMLHttpRequestResponseType | string> {
        const relativeUrl: string = 'posts';
        return this.makeRequest(Story.BASE_URL + relativeUrl);
    }

    // Range of possible chapters: 0 < chapter <= 99
    public getChapter(chapter: number): Promise<XMLHttpRequestResponseType | string> {
        return this.makeRequest(`${Story.BASE_URL}posts/${chapter.toString()}`);
    }

    public spawn(result: XMLHttpRequestResponseType): void {
        let posts = JSON.parse(result);
        if (posts instanceof Array === false) {
            posts = [posts];
        }
        for (const post of posts) {
            this.storyElement.innerHTML +=
                `<h1>${post.title}</h1>
                    <div class="story-info"><i>ID: Post-${post.id}</i></div>
                <div><p>${post.body}.</p></div>`;
        }
    }

    public displayFinished() {
        document.body.innerHTML += '<div>All done!</div>';
    }
}

const story = new Story();
document.body.appendChild(story.storyElement);
document.body.appendChild(story.spinnerElement);

story.getAllStories()
    .then((response: XMLHttpRequestResponseType) => story.spawn(response))
    .finally(() => {
        story.spinnerElement.style.display = 'none';
        story.displayFinished();
    });

story.getChapter(1)
    .then((response1: XMLHttpRequestResponseType) => {
        story.spawn(response1);
    })
    .then(() => story.getChapter(2)
        .then((response2: XMLHttpRequestResponseType) => {
            story.spawn(response2);
        }))
    .then(() => story.getChapter(3)
        .then((response3: XMLHttpRequestResponseType) => {
            story.spawn(response3);
        }))
    .then(() => story.getChapter(4)
        .then((response4: XMLHttpRequestResponseType) => {
            story.spawn(response4);
        }))
    .then(() => story.getChapter(5)
        .then((response5: XMLHttpRequestResponseType) => {
            story.spawn(response5);
        }))
    .finally(() => {
        story.spinnerElement.style.display = 'none';
        story.displayFinished();
    });

const promises: Array<Promise<void>> = [];

for (const n of [1, 2, 3, 4, 5]) {
    promises.push(story.getChapter(n)
        .then((response: XMLHttpRequestResponseType) => {
            story.spawn(response);
        }));
}

Promise.all(promises).finally(() => {
    story.spinnerElement.style.display = 'none';
    story.displayFinished();

});

Promise.race(promises).finally(() => {
    story.spinnerElement.style.display = 'none';
    story.displayFinished();
});

async function getFirstFiveChapter() {
    try {
        for (const n of [1, 2, 3, 4 , 5]) {
            const chapter = await story.getChapter(n);
            story.spawn(chapter as XMLHttpRequestResponseType);
        }
    } finally {
        story.spinnerElement.style.display = 'none';
        story.displayFinished();
    }
}

getFirstFiveChapter();

async function getStoryAndPrint(chapter: number) {
    const res = await story.getChapter(chapter);
    story.spawn(res as XMLHttpRequestResponseType);
}

async function getFirstFiveStoriesInParallel() {
    try {
        const promises = [];

        for (const n of [1, 2, 3, 4, 5]) {
            promises.push(getStoryAndPrint(n));
        }

        await Promise.all(promises);
    } finally {
        story.spinnerElement.style.display = 'none';
        story.displayFinished();
    }
}

getFirstFiveStoriesInParallel();