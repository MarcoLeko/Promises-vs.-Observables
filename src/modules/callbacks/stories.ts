function makeRequest(url: string, onSuccess: (val: object) => void, onFailure?: (val: Error) => void): void {
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
        if (req.status === 200) {
            fakeLatency(() => onSuccess(req.response));
        }
    };

    req.onerror = () => onFailure(Error('Network Error'));

    req.send();
}

function fakeLatency(callback): void {
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

function getAllStories(callback): void {
    makeRequest(baseUrl(), callback);
}

function getChapter(chapter: number, onSuccess, onFailure?): void {
    makeRequest(baseUrl() + chapter.toString(), onSuccess, onFailure);
}

function spawn(content): void {
    content = JSON.parse(content);

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

function catchError(err) {
    document.body.innerHTML += `Ooops! Error Occurred! ${err}`;
}

function displayFinished(): void {
    loadingIcon.style.display = 'none';
    createElm('<div>All done!</div>');
}

/*** Execution **/
const loadingIcon = createElm(`<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                        <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
                    </svg>`);

getAllStories(response => {
    spawn(response);
    displayFinished();
});

/*** Before Ecmascript 6 **/

getChapter(1, function (response1) {
    spawn(response1);
    getChapter(2, function (response2) {
        spawn(response2);
        getChapter(3, function (response3) {
            spawn(response3);
            displayFinished();
        });
    });
});

getChapter(1, function(response1) {
    spawn(response1);
    getChapter(2, function(response2) {
        spawn(response2);
        getChapter(3, function(response3) {
            spawn(response3);
            displayFinished();
        }, function(err3) {
            catchError(err3);
        });
    }, function(err2) {
        catchError(err2);
    });
}, function(err1) {
    catchError(err1);
});

/*** With Ecmascript 6 and after **/
getChapter(1, response1 => {
    spawn(response1);
    getChapter(2, response2 => {
        spawn(response2);
        getChapter(3, response3 => {
            spawn(response3);
            displayFinished();
        });
    });
});

getChapter(1, response1 => {
    spawn(response1);
    getChapter(2, response2 => {
        spawn(response2);
        getChapter(3, response3 => {
            spawn(response3);
            displayFinished();
        }, err3 => catchError(err3));
    }, err2 => catchError(err2));
}, err1 => catchError(err1));