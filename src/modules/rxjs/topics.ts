import {fromEvent} from 'rxjs/internal/observable/fromEvent';

document.body.innerHTML += `<div class="center">
                                <input class="form-control" type="text">
                                <p id="result"></p>
                            </div>`;

const node = document.querySelector('input[type=text]');
const input$ = fromEvent(node, 'input');

input$.subscribe({
    next: event =>
        document.getElementById('result').innerText = (<HTMLInputElement> event.target).value,
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});