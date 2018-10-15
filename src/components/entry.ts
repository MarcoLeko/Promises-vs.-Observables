import {createEntryForm} from '../views/entry-form';
import {createEntryPanel} from '../views/entry-panel';
import {createAlert} from '../views/alerts';
import {auth, firestore} from '../firebase.config';
import {UserInformation} from './user-information.interface';

export class Entry {

    private email: string;
    private password: string;

    constructor() {
        createEntryPanel();
        this.handleLogin();
        this.handleRegistration();
    }

    public handleLogin(): void {
        const LoginFormBtn: HTMLElement = document.getElementById('loginFormButton');
        LoginFormBtn.addEventListener('click', () => {
            createEntryForm('login');
            this.login();
        });
    }

    public handleRegistration(): void {
        const registerFormBtn: HTMLElement = document.getElementById('registerFormButton');
        registerFormBtn.addEventListener('click', () => {
            createEntryForm('register');
            this.register();
        });
    }

    public login(): void {
        const loginForm: HTMLElement = document.getElementById('loginForm');
        loginForm.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.setUserCredentials('loginForm');
            auth.signInWithEmailAndPassword(this.email, this.password).catch(err =>
                createAlert('danger', err.message));
        });
    }

    public register(): void {
        const registerBtn: HTMLElement = document.getElementById('registerForm');
        registerBtn.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.setUserCredentials('registerForm');
            auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
                const user: firebase.User = auth.currentUser;
                const defaultUserEntity: UserInformation = {email: user.email, age: null, location: null, todo: null};
                firestore.doc(`users/${user.uid}`).set(defaultUserEntity).then(() =>
                    createAlert('success', `✅ User ${this.email} successfully signed up!`)
                );
            }).catch((err) => createAlert('danger', `❌ ${err.message}`));
        });
    };

    private setUserCredentials(form) {
        this.email = document.getElementById(form)[0].value;
        this.password = document.getElementById(form)[1].value;
    }
}