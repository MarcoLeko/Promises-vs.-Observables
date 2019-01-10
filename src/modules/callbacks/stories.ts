export function makeRequest(url: string, onSuccess: (val: any) => void, onFailure?: (val: Error) => void): void {
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
        if (req.status === 200) {
            fakeLatency(() => onSuccess(JSON.parse(req.response)));
        }
    };

    req.onerror = () => onFailure(Error('Network Error'));

    req.send();
}

export function fakeLatency(callback: () => void): void {
    setTimeout(callback, 3000 * Math.random());
}

export function baseUrl(): string {
    return 'https://jsonplaceholder.typicode.com/posts/';
}

export function createElm(innerHTML: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = innerHTML;
    document.body.appendChild(div);
    return div;
}

const loadingIcon = createElm(`<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                        <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
                    </svg>`);

export function getAllChapters(onSuccess: (val: any) => void, onFailure?: (err: Error) => void): void {
    makeRequest(baseUrl(), onSuccess, onFailure);
}

export function getChapter(chapter: number, onSuccess: (val: any) => void, onFailure?: (err: Error) => void): void {
    makeRequest(baseUrl() + chapter.toString(), onSuccess, onFailure);
}

export function spawn(content: any): void {
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

        document.body.insertBefore(snippet, loadingIcon);
    });
}

export function catchError(err: Error) {
    createElm(`Ooops! Error Occurred! ${err}`);
}

export function displayFinished(): void {
    loadingIcon.style.display = 'none';
    createElm('All done!');
}