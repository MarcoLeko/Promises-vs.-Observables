export function createEntryForm(method): void {
    document.getElementById('signUpMethod').innerHTML = `<label class="sr-only">Email address</label>
                <input type="email" class="form-control" placeholder="Email" required="" autofocus="">
                <label class="sr-only">Password</label>
                <input type="password" class="form-control mt-1" placeholder="Password" required="">
                <button id="${method}Button" type="button" class="btn btn-lg btn-primary btn-block mt-2 mb-3">${method}</button>`;
}