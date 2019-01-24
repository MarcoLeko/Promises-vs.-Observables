import {from, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';

/*** Prepare HTML **/
const wikipediaSearch: HTMLElement = document.createElement('div');
wikipediaSearch.className = 'center';
wikipediaSearch.innerHTML = '<input class="form-control" id="search">';

document.body.appendChild(wikipediaSearch);

const searchResult: HTMLElement = document.createElement('section');
searchResult.className = 'searchResults';

wikipediaSearch.appendChild(searchResult);

/*** Functional Logic of autocomplete **/
function searchWikipedia(query: string) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`)
        .then(data => data.json())
        .then(results => results.query.search);
}

function insertArticle(article: any) {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${article.title}`);

    searchResult.insertAdjacentHTML('beforeend',
        `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${article.title}</a>
        </h3>
        <span class="resultItem-snippet">${article.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
    );
}

fromEvent(wikipediaSearch, 'input').pipe(
    debounceTime(250),
    map((eventObj: Event) => (<HTMLInputElement> eventObj.target).value),
    filter(query => query.length > 1 || query.length === 0),
    distinctUntilChanged(),
    switchMap(query => query ?
        from(searchWikipedia(query)) : from(Promise.resolve([]))
    )
).subscribe((articles: Array<any>) => {
    searchResult.innerHTML = '';

    if (articles.length === 0) {
        return;
    } else {
        articles.forEach(article => insertArticle(article));
    }
});