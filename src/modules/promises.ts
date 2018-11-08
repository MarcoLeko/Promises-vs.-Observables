export interface Post {
    userId: string;
    id: string;
    title: string;
    body: string;
}

export class HTTP {

    public makeRequest(url: string): Promise<XMLHttpRequestResponseType | string> {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);

            req.onload = () => {
                if (req.status === 200) {
                    resolve(req.response);
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
}

class Story extends HTTP {

    public static BASE_URL = 'https://jsonplaceholder.typicode.com/';

    public getAllStories(): Promise<XMLHttpRequestResponseType | string> {
        const relativeUrl: string = 'posts';
        return this.makeRequest(Story.BASE_URL + relativeUrl);
    }

    public getChapter(chapter: number): Promise<XMLHttpRequestResponseType | string> {
        return this.makeRequest(`${Story.BASE_URL}posts/${chapter.toString()}`);
    }

    public printPost(result: XMLHttpRequestResponseType): void {
        let posts = JSON.parse(result);
        if (posts instanceof Array === false)  {
            posts = [posts];
        }
        for (const post of posts) {
            document.body.innerHTML +=
                `<h1>${post.title}</h1>
                    <div class="story-info"><i>Path: posts/${post.id}</i></div>
                <div><p>${post.body}.</p></div>`;
        }
    }
}

const story = new Story();
story.getAllStories()
    .then((response: XMLHttpRequestResponseType) => story.printPost(response));

story.getChapter(1)
    .then((response: XMLHttpRequestResponseType) => story.printPost(response));