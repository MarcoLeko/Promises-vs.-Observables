class Notifications {

    public success(msg: string): void {
        document.body.innerHTML +=
            `<div class="alert alert-success slide-in-left" role="alert">${msg}</div>` as string;
    }

    public primary(msg: string): void {
        document.body.innerHTML +=
            `<div class="alert alert-primary slide-in-left" role="alert">${msg}</div>` as string;
    }
}

class Synchronous {

    public notification: Notifications = new Notifications();

    public printMessages(): void {
        this.notification.success('Hey Im message Nr. 1️⃣ !');
        this.notification.success('Hey Im message Nr. 2️⃣ !');
        this.notification.success('Hey Im message Nr. 3️⃣ !');
    }
}

class Asynchronous {

    public notification: Notifications = new Notifications();

    public printMessages(): void {
        this.notification.primary('Hey Im message Nr. 1️⃣ !');
        setTimeout(() => this.notification.primary('Hey Im message Nr. 2️⃣ !'), 50);
        this.notification.primary('Hey Im message Nr. 3️⃣ !');
    }
}

const sync = new Synchronous();
const async = new Asynchronous();

sync.printMessages();
async.printMessages();