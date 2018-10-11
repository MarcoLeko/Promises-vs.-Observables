import * as img from '../assets/hm-logo.svg';

export function createNavbar(email: string): void {
    document.getElementById('main').innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="javascript:void(0)">
  <img class="mb-4" id="hm-logo" width="125" height="auto">
</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <span class="nav-link disabled" href="javascript:void(0)">Hello, ${email}</span>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <button id="logout" class="btn btn-outline-success my-2 my-sm-0" type="button">Logout</button>
    </form>
  </div>
</nav>`;
    const image: HTMLImageElement = document.getElementById('hm-logo') as HTMLImageElement;
    image.src = img;
}