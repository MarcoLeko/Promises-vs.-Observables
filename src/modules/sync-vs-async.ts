export class Notifications {

    public msg(msg: string): void {
        document.body.innerHTML +=
            `<div class="alert" role="alert">${msg}</div>` as string;
    }
}

class Synchronous extends Notifications {

    private printMessages(): void {
        this.msg('Hey Im message Nr. 1!');
        this.msg('Hey Im message Nr. 2 !');
        this.msg('Hey Im message Nr. 3 !');
    }

    public printAndTrackTime() {
        const begin = window.performance.now();
        this.printMessages();
        const end = window.performance.now();
        document.body.innerHTML += `<div class="time-box sync">Synchronous: ${end - begin}ms</div>`
    }
}

class Asynchronous extends Notifications {

    private printMessages(): void {
        this.msg('Hey Im message Nr. 1 !');
        setTimeout(() => this.msg('Hey Im message Nr. 2 !'), 50);
        this.msg('Hey Im message Nr. 3!');
    }

    public printAndTrackTime() {
        const begin = window.performance.now();
        this.printMessages();
        const end = window.performance.now();
        document.body.innerHTML += `<div class="time-box async">Asynchronous: ${end - begin}ms</div>`
    }
}

const sync = new Synchronous();
const async = new Asynchronous();

sync.printAndTrackTime();
document.body.innerHTML += '<hr>';
async.printAndTrackTime();