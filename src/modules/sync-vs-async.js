var Notifications = /** @class */ (function () {
    function Notifications() {
    }
    Notifications.prototype.msg = function (msg) {
        document.body.innerHTML +=
            "<div class=\"alert\" role=\"alert\">" + msg + "</div>";
    };
    return Notifications;
}());
var Synchronous = /** @class */ (function () {
    function Synchronous() {
        this.notification = new Notifications();
    }
    Synchronous.prototype.printMessages = function () {
        this.notification.msg('Hey Im message Nr. 1️⃣ !');
        this.notification.msg('Hey Im message Nr. 2️⃣ !');
        this.notification.msg('Hey Im message Nr. 3️⃣ !');
    };
    return Synchronous;
}());
var Asynchronous = /** @class */ (function () {
    function Asynchronous() {
        this.notification = new Notifications();
    }
    Asynchronous.prototype.printMessages = function () {
        var _this = this;
        this.notification.msg('Hey Im message Nr. 1️⃣ !');
        setTimeout(function () { return _this.notification.msg('Hey Im message Nr. 2️⃣ !'); }, 50);
        this.notification.msg('Hey Im message Nr. 3️⃣ !');
    };
    return Asynchronous;
}());
var sync = new Synchronous();
var async = new Asynchronous();
sync.printMessages();
async.printMessages();
//# sourceMappingURL=sync-vs-async.js.map