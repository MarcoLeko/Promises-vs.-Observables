import '../styles.css';
import {flatMap, last} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

of(['1', '2', '3']).pipe(flatMap(res => res), last()).subscribe(res => console.log(res));