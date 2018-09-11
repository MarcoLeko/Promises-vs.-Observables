import './config';
import './styles/styles.css';
import * as img from './assets/hm-logo.svg';
import {app} from './config';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const auth: firebase.auth.Auth = app.auth();

class LoginPanel {

    public registerPanel: string = `<form id="registerForm" class="sign-up-form mt-5">
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

    private username: string;
    private password: string;

    constructor() {
        document.body.innerHTML = this.registerPanel;
        const image: HTMLImageElement = document.getElementById('hm-logo') as HTMLImageElement;
        image.src = img;
        const btn: HTMLElement = document.getElementById('registerButton');
        btn.addEventListener('click', () => this.submitForm());
    }

    public submitForm(): void {
        this.setUserCredentials();
    };

    private setUserCredentials() {
        this.username = document.getElementById('registerForm')[0].value;
        this.password = document.getElementById('registerForm')[1].value;
    }
}

const loginPanel = new LoginPanel();