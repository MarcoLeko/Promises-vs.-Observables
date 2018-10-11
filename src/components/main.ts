import 'bootstrap';
import '../styles.css';

import {User} from './user';

const user = new User();
window.onload = () => user.initApp();