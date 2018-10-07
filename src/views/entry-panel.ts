export function createEntryPanel(): string {
    return `<form id="signUpForm" class="sign-up-form mt-5">
                <img class="mb-4" id="hm-logo" width="250" height="auto">
                <div class="text-center">
                    <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
                </div>
                    <div id="signUpMethod">
                        <button id="loginFormButton" type="button" class="btn btn-lg btn-info btn-block mt-2 mb-3">Login</button>
                        <div class="hr-sect">or</div>
                        <button id="registerFormButton"type="button" class="btn btn-lg btn-primary btn-block mt-2 mb-3">Register</button>
                </div>
            </form>`;
}