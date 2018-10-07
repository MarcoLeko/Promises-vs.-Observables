export function createEntryForm(method): void {
    document.getElementById('signUpMethod').innerHTML = `<label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control mt-1" placeholder="Password" required="">
                <button id="${method}Button" type="button" class="btn btn-lg btn-primary btn-block mt-2 mb-3">${method}</button>`;
}