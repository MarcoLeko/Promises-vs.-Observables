import * as img from '../assets/hm-logo.svg';

export function createEntryPanel(): void {
    document.getElementById('main').innerHTML = `
<div class="select-entry-panel mt-5">
    <img class="mb-4" id="hm-logo" width="250" height="auto">
    <div class="text-center">
        <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
    </div>
    <div id="signUpMethod">
        <button id="loginFormButton" type="button" class="btn btn-lg btn-info btn-block mt-2 mb-3">Login</button>
        <div class="hr-sect">or</div>
        <button id="registerFormButton"type="button" class="btn btn-lg btn-primary btn-block mt-2 mb-3">Register</button>
    </div>
</div>`;
    const image: HTMLImageElement = document.getElementById('hm-logo') as HTMLImageElement;
    image.src = img;
}