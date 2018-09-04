"use strict";
const appDiv = document.getElementById('app');
if (appDiv) {
    appDiv.innerHTML = `
<form class="form-signin mt-5">
      <img class="mb-4" src="assets/Hochschule_Muenchen_Logo.svg" alt="" width="250" height="auto">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <div class="checkbox mb-3 mt-2">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>`;
}
//# sourceMappingURL=index.js.map