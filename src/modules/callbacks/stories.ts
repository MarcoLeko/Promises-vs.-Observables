function makeRequest(url: string, onSuccess: (val: any) => void, onFailure?: (val: Error) => void): void {
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

function fakeLatency(callback: () => void): void {
    setTimeout(callback, 3000 * Math.random());
}

function baseUrl(): string {
    return 'https://jsonplaceholder.typicode.com/posts/';
}

function createElm(innerHTML: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = innerHTML;
    document.body.appendChild(div);
    return div;
}

function getAllChapters(onSuccess: (val: any) => void, onFailure?: (err: Error) => void): void {
    makeRequest(baseUrl(), onSuccess, onFailure);
}

function getChapter(chapter: number, onSuccess: (val: any) => void, onFailure?: (err: Error) => void): void {
    makeRequest(baseUrl() + chapter.toString(), onSuccess, onFailure);
}

function spawn(content: any): void {
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

function catchError(err: Error) {
    createElm(`Ooops! Error Occurred! ${err}`);
}

function displayFinished(): void {
    loadingIcon.style.display = 'none';
    createElm('<div>All done!</div>');
}

/*** Execution **/
const loadingIcon = createElm(`<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                        <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
                    </svg>`);

getAllChapters(function(response) {
    spawn(response);
    displayFinished();
});

getChapter(1, function(response1) {
    spawn(response1);
    getChapter(2, function(response2) {
        spawn(response2);
        getChapter(3, function(response3) {
            spawn(response3);
            displayFinished();
        });
    });
});

getChapter(1, response1 => { // (*)
    spawn(response1);
    getChapter(2, response2 => { // (**)
        spawn(response2);
        getChapter(3, response3 => { // (***)
            spawn(response3);
            displayFinished();
        }, err3 => catchError(err3)); // (***)
    }, err2 => catchError(err2)); // (**)
}, err1 => catchError(err1)); // (*)