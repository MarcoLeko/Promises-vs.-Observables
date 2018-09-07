class LoginPanel {
    constructor() {
        this.appDiv = document.getElementById('app');
        this.setForm();
        const btn = document.getElementById('registerButton');
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            this.submitForm();
        });
    }
    setForm() {
        this.appDiv.innerHTML = `<form id="registerForm" class="form-signin mt-5">
    <img class="mb-4" src="./assets/Hochschule_Muenchen_Logo.svg" width="250" height="auto">
    <div class="text-center">
        <h1 class="h3 mb-3 font-weight-normal">Sign up</h1>
    </div>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control mt-1" placeholder="Password" required="">
    <button id="registerButton" class="btn btn-lg btn-primary btn-block mt-2 mb-3" type="click">Sign in</button>
</form>`;
    }
    submitForm() {
        const username = document.getElementById('registerForm')[0].value;
        console.log(username);
    }
    ;
}
new LoginPanel();
//# sourceMappingURL=index.js.map