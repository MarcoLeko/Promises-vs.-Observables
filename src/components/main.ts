import 'bootstrap';
import '../styles.css';
import 'firebase/auth';

import {User} from './user';

const user = new User();
window.onload = () => user.initApp();