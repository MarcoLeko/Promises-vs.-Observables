export function createRegisterPanel(): string {
    return `<form id="registerForm" class="sign-up-form mt-5">
                <img class="mb-4" id="hm-logo" width="250" height="auto">
                <div class="text-center">
                    <h1 class="h3 mb-3 font-weight-normal">Sign up</h1>
                </div>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control mt-1" placeholder="Password" required="">
                <button id="registerButton" type="button" class="btn btn-lg btn-primary btn-block mt-2 mb-3">Sign in</button>
            </form>`;
}