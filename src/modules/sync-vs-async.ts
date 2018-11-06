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
        console.log(`Synchronous: ${(end - begin)}Milliseconds`)
    }
}

class Asynchronous extends Notifications {

    private printMessages(): void {
        this.msg('Hey Im message Nr. 1 !');
        setTimeout(() => this.msg('Hey Im message Nr. 2 !'));
        this.msg('Hey Im message Nr. 3!');
    }

    public printAndTrackTime() {
        const begin = window.performance.now();
        this.printMessages();
        const end = window.performance.now();
        console.log(`Asynchronous: ${(end - begin)}Milliseconds`)
    }
}

const sync = new Synchronous();
const async = new Asynchronous();

sync.printAndTrackTime();
async.printAndTrackTime();