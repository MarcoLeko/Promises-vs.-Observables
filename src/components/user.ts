import {auth} from '../firebase-config';
import {createNavbar} from '../views/profile-overview-navbar';
import {Entry} from './entry';


export class User {

    private email: string;

    private setUserOverview() {
        createNavbar(this.email);
        this.logout();
    }

    public initApp() {
        // Listen for auth state changes.
       return auth.onAuthStateChanged(user => {
            if (user) {
                this.email = user.email;
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