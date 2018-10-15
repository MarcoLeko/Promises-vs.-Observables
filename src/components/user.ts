import {auth} from '../firebase.config';
import {createNavbar} from '../views/navbar';
import {Entry} from './entry';

export class User {

    private currentUser: firebase.User;

    private setUserOverview() {
        createNavbar(this.currentUser.email);
        this.logout();
    }

    public initApp() {
        // Listen for auth state changes.
       return auth.onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
                this.setUserOverview();
            } else {
                new Entry()
            }
        })
    }

    private logout(): void {
        const registerFormBtn: HTMLElement = document.getElementById('logout');
        registerFormBtn.addEventListener('click', () => {
            auth.signOut();
        });
    }
}