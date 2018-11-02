class Notifications {

    public msg(msg: string): void {
        document.body.innerHTML +=
            `<div class="alert" role="alert">${msg}</div>` as string;
    }
}

class Synchronous {

    public notification: Notifications = new Notifications();

    public printMessages(): void {
        this.notification.msg('Hey Im message Nr. 1!');
        this.notification.msg('Hey Im message Nr. 2 !');
        this.notification.msg('Hey Im message Nr. 3 !');
    }
}

class Asynchronous {

    public notification: Notifications = new Notifications();

    public printMessages(): void {
        this.notification.msg('Hey Im message Nr. 1 !');
        setTimeout(() => this.notification.msg('Hey Im message Nr. 2 !'), 50);
        this.notification.msg('Hey Im message Nr. 3!');
    }
}

const sync = new Synchronous();
const async = new Asynchronous();

sync.printMessages();
async.printMessages();