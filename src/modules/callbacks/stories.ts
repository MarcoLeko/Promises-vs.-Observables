function makeRequest(url: string, onSuccess, onFailure?): void {
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
        if (req.status === 200) {
            setTimeout(onSuccess(req.response), 3000 * Math.random());
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

function spawn(content, html: HTMLElement, callback): void {
    content = JSON.parse(content);

    if (content instanceof Array === false) {
        content = [content];
    }

    content.forEach(elm => {
        const story = document.createElement('div');
        story.innerHTML = `<h1>${elm.title}</h1>
                           <div class="story-info">
                               <i>ID: Post-${elm.id}</i>
                           </div>
                           <p>${elm.body}.</p>`;

        document.body.insertBefore(story, html);

    });

    callback();
}

function catchError(err, callback) {
    document.body.innerHTML += `Ooops! Error Occurred! ${err}`;
    callback();
}

function displayFinished(html: HTMLElement): void {
    html.style.display = 'none';
    document.body.innerHTML += '<div>All done!</div>';
}

const loadingIcon = createElm(`<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                        <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
                    </svg>`);

// getAllStories(response =>
//     spawn(response, stories, () =>
//         displayFinished(loadingIcon)));

// getChapter(1, (response1) =>
//     spawn(response1, stories,
//         getChapter(2, (response2) =>
//             spawn(response2, stories, getChapter(3, (response3) =>
//                     spawn(response3, stories, () =>
//                         displayFinished(loadingIcon)
//                     )
//                 )
//             )
//         )
//     )
// );

getChapter(1, (first) => spawn(first, loadingIcon, () =>
        getChapter(2, (second) => spawn(second, loadingIcon, () =>
            getChapter(3, (third) => spawn(third, loadingIcon, () =>
                displayFinished(loadingIcon)))))),
    (err) => catchError(err, () => displayFinished(loadingIcon)));