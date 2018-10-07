import './firebase-config';
import 'bootstrap';
import * as $ from 'jquery';
import './styles/styles.css';
import * as img from './assets/hm-logo.svg';
import {app} from './firebase-config';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {createRegisterPanel} from './views/register-panel';
import {createAlert} from './views/alerts';

const auth: firebase.auth.Auth = app.auth();

class Register {

    private username: string;
    private password: string;

    constructor() {
        document.body.innerHTML = createRegisterPanel();
        const image: HTMLImageElement = document.getElementById('hm-logo') as HTMLImageElement;
        image.src = img;
        const btn: HTMLElement = document.getElementById('registerButton');
        btn.addEventListener('click', () => this.submitForm());
    }

    public submitForm(): void {
        this.setUserCredentials();
        const alert: HTMLElement = document.createElement('div');
        auth.createUserWithEmailAndPassword(this.username, this.password).then(() => {
            const form: HTMLFormElement = document.getElementById('registerForm') as HTMLFormElement;
            form.reset();
            alert.innerHTML = createAlert('success', `User with the email ${this.username} successfully signed up!`);
        }).catch((err) => {
            alert.innerHTML = createAlert('danger', err.message);
        });
        document.body.insertBefore(alert, document.body.childNodes[0]);
        setTimeout(() => $('.alert').alert('close'), 4000)
    };

    private setUserCredentials() {
        this.username = document.getElementById('registerForm')[0].value;
        this.password = document.getElementById('registerForm')[1].value;
    }
}

const loginPanel = new Register();