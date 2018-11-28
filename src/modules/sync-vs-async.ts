
export class Print {

    public msg(msg: string): void {
        document.body.innerHTML +=
            `<div class="alert" role="alert">${msg}</div>`;
    }
}

class Synchronous extends Print {

    public printMessages(): void {
        this.msg('Hey Im message Nr. 1!');
        this.msg('Hey Im message Nr. 2 !');
        this.msg('Hey Im message Nr. 3 !');
        this.msg('Done!');
    }
}

class Asynchronous extends Print {

    public printMessages(): void {
        setTimeout(() => this.msg('Hey Im message Nr. 1 !'), Math.random() * 10);
        setTimeout(() => this.msg('Hey Im message Nr. 2 !'), Math.random() * 10);
        setTimeout(() => this.msg('Hey Im message Nr. 3!'), Math.random() * 10);
        setTimeout(() => this.msg('Done!'), Math.random() * 10);
    }

    public printAsyncAndSequential(): void {
        setTimeout(() => {
            this.msg('Hey Im message Nr. 1 !');
            setTimeout(() => {
                this.msg('Hey Im message Nr. 2 !');
                setTimeout(() => {
                    this.msg('Hey Im message Nr. 3!');
                    setTimeout(() => {
                        this.msg('Done!');
                    }, Math.random() * 10);
                }, Math.random() * 10);
            }, Math.random() * 10);
        }, Math.random() * 10);
    }
}

const sync = new Synchronous();
const async = new Asynchronous();

sync.printMessages();
document.body.innerHTML += '<hr>';
async.printMessages();
