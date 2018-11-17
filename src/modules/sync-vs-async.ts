export class Print {

    public msg(msg: string): void {
        document.body.innerHTML +=
            `<div class="alert" role="alert">${msg}</div>` as string;
    }

    public time(begin: number, end: number, css: string) {
        document.body.innerHTML += `<div class="time-box ${css}">time: ${end - begin}ms</div>`;
    }
}

class Synchronous extends Print {

    public printAndTrackTime() {
        const begin = window.performance.now();
        this.printMessages();
        const end = window.performance.now();
        this.time(begin, end, 'sync');
    }

    private printMessages(): void {
        this.msg('Hey Im message Nr. 1!');
        this.msg('Hey Im message Nr. 2 !');
        this.msg('Hey Im message Nr. 3 !');
    }
}

class Asynchronous extends Print {

    public printAndTrackTime() {
        const begin = window.performance.now();
        this.printMessages();
        const end = window.performance.now();
        this.time(begin, end, 'async');
    }

    private printMessages(): void {
        this.msg('Hey Im message Nr. 1 !');
        setTimeout(() => this.msg('Hey Im message Nr. 2 !'), 50);
        this.msg('Hey Im message Nr. 3!');
    }
}

const sync = new Synchronous();
const async = new Asynchronous();

sync.printAndTrackTime();
document.body.innerHTML += '<hr>';
async.printAndTrackTime();