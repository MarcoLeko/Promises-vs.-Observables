// import * as firebase from 'firebase/app';
// import {app} from './config';
//
// const auth: firebase.auth.Auth = app.auth();


class LoginPanel {

    private username: string;
    private password: string;

    constructor() {
        const btn: HTMLElement = document.getElementById('registerButton');
        btn.addEventListener('click', () => this.submitForm());
    }

    public submitForm(): void {
        this.setUserCredentials();
        console.log(this.username)
    };

    private setUserCredentials() {
        this.username = document.getElementById('registerForm')[0].value;
        this.password = document.getElementById('registerForm')[1].value;
    }
}

const loginPanel = new LoginPanel();