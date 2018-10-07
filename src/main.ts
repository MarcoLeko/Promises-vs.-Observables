import './firebase-config';
import 'bootstrap';
import './styles/styles.css';
import * as img from './assets/hm-logo.svg';
import {app} from './firebase-config';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {createEntryPanel} from './views/entry-panel';
import {createEntryForm} from './views/entry-form';
import {createAlert} from './views/alerts';

const auth: firebase.auth.Auth = app.auth();

class Entry {

    private email: string;
    private password: string;

    constructor() {
        document.body.innerHTML = createEntryPanel();
        const image: HTMLImageElement = document.getElementById('hm-logo') as HTMLImageElement;
        image.src = img;
        this.addButtonEventListeners();
    }

    public setLoginPanel(): void {
        const form: HTMLElement = document.getElementById('signUpMethod');
        form.innerHTML = createEntryForm('login');

        const loginBtn: HTMLElement = document.getElementById('loginButton');
        loginBtn.addEventListener('click', () => this.login());
    }

    public setRegisterPanel(): void {
        const form: HTMLElement = document.getElementById('signUpMethod');
        form.innerHTML = createEntryForm('register');

        const registerBtn: HTMLElement = document.getElementById('registerButton');
        registerBtn.addEventListener('click', () => this.register());
    }

    public login(): void {
        this.setUserCredentials();
        auth.signInWithEmailAndPassword(this.email, this.password).catch(err =>
            createAlert('danger', err.message));
    }

    public register(): void {
        this.setUserCredentials();
        auth.createUserWithEmailAndPassword(this.email, this.password).then(() =>
            createAlert('success', `User with the email ${this.email} successfully signed up!`))
            .catch((err) => createAlert('danger', err.message));
    };

    private addButtonEventListeners() {
        const registerFormBtn: HTMLElement = document.getElementById('registerFormButton');
        registerFormBtn.addEventListener('click', () => this.setRegisterPanel());

        const LoginFormBtn: HTMLElement = document.getElementById('loginFormButton');
        LoginFormBtn.addEventListener('click', () => this.setLoginPanel());
    }

    private setUserCredentials() {
        this.email = document.getElementById('signUpForm')[0].value;
        this.password = document.getElementById('signUpForm')[1].value;
    }
}

new Entry();