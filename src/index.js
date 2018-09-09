"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var auth = firebase.auth();
var LoginPanel = /** @class */ (function () {
    function LoginPanel() {
        var _this = this;
        var btn = document.getElementById('registerButton');
        btn.addEventListener('click', function () { return _this.submitForm(); });
    }
    LoginPanel.prototype.submitForm = function () {
        this.setUserCredentials();
        console.log(this.username);
    };
    ;
    LoginPanel.prototype.setUserCredentials = function () {
        this.username = document.getElementById('registerForm')[0].value;
        this.password = document.getElementById('registerForm')[1].value;
    };
    return LoginPanel;
}());
var loginPanel = new LoginPanel();
console.log('Hello there!');
//# sourceMappingURL=index.js.map