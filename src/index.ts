class LoginPanel {

    public appDiv: HTMLElement = document.getElementById('app');

    constructor() {
        this.setForm();
        let btn = document.getElementById('loginButton');
        btn.addEventListener('click', () => this.submitForm());
    }

    public setForm(): void {
        this.appDiv.innerHTML = `<form id="loginForm" class="form-signin mt-5">
  <img class="mb-4" src="assets/Hochschule_Muenchen_Logo.svg" width="250" height="auto">
      <div class="text-center">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      </div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control mt-1" placeholder="Password" required="">
      <div class="checkbox mb-3 mt-2">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button id="loginButton" class="btn btn-lg btn-primary btn-block" type="button">Sign in</button>
    </form>
    `;
    }

    public submitForm(): void {
        const elementFirst: HTMLElement = document.createElement('pre');
        const elementSecond: HTMLElement = document.createElement('pre');

        elementFirst.innerHTML = 'email: ' + document.getElementById('loginForm')[0].value;
        document.getElementById('loginForm').appendChild(elementFirst);

        elementSecond.innerHTML = 'password: ' + document.getElementById('loginForm')[1].value;
        document.getElementById('loginForm').appendChild(elementSecond);
    }

}

new LoginPanel();
