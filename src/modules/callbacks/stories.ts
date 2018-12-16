function makeRequest(url: string, callback, error?): void {
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
        if (req.status === 200) {
            fakeLatency(callback(req.response));
        }
    };

    req.onerror = () => error(Error('Network Error'));

    req.send();
}

function fakeLatency(callback): void {
    setTimeout(callback, 3000 * Math.random());
}

function getBaseURl(): string {
    return 'https://jsonplaceholder.typicode.com/posts/';
}

const storyElement: HTMLElement = document.createElement('div');
const spinnerElement: HTMLElement = document.createElement('div');

spinnerElement.innerHTML =
    `<svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
                <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)" />
             </svg>`;

document.body.appendChild(storyElement);
document.body.appendChild(spinnerElement);

function getAllStories(callback): void {
    makeRequest(getBaseURl(), (res) => spawn(res, callback));
}

function spawn(content, callback): void {
    content = JSON.parse(content);

    if (content instanceof Array === false) {
        content = [content];
    }

    content.forEach(elm =>
        storyElement.innerHTML +=
            `<h1>${elm.title}</h1>
                     <div class="story-info"><i>ID: Post-${elm.id}</i></div>
                 <div><p>${elm.body}.</p></div>`
    );

    callback();
}

function displayFinished(): void {
    spinnerElement.style.display = 'none';
    document.body.innerHTML += '<div>All done!</div>';
}

getAllStories(displayFinished);
