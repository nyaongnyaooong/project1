const createDOM = (element, className) => {
  const DOM = document.createElement(element);
  DOM.className = className;

  return DOM;
};

const nav = createDOM("nav", "navbar navbar-expand-lg navbar-light bg-dark");
const aNavProfile = createDOM("a", "navbar navbar-expand-lg navbar-light bg-dark");
const divNavProfile = createDOM("div", "d-inline-block align-top divNavProfile");
const ImgNavProfile = createDOM("img", "d-inline-block align-top profileCircle");
ImgNavProfile.src = '/img/68260365.png';
divNavProfile.append(ImgNavProfile);
aNavProfile.append(divNavProfile);

const spanNavProfile = createDOM('span', '');
spanNavProfile.innerHTML = 'NyaongNyaooong';
aNavProfile.append(spanNavProfile);
nav.append(aNavProfile);

const divContent = createDOM("div", "navbar-collapse");
const ulContent = createDOM("ul", "navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll");
ulContent.style.maxHeight = '100px';
divContent.append(ulContent);
nav.append(divContent);

const liContentHome = createDOM("li", "nav-item active");
const aContentHome = createDOM("a", "nav-item active");
aContentHome.innerHTML = 'Home';
liContentHome.append(aContentHome);

const liContentBoard = createDOM("li", "nav-item active");
const aContentBoard = createDOM("a", "nav-item active");
aContentBoard.innerHTML = '게시판';
liContentBoard.append(aContentBoard);

ulContent.append(liContentHome);
ulContent.append(liContentBoard);
divContent.append(ulContent);

const aLogin = createDOM("a", '');
aLogin.href = '로그인';
const buttonLogin = createDOM("button", "btn btn-outline-primary ml-3");
aLogin.append(buttonLogin);
nav.append(aLogin);

const aRegister = createDOM('a', '');
aRegister.href = '회원가입';
const buttonRegister = createDOM('button', "btn btn-outline-primary ml-3");
aRegister.append(buttonRegister);
nav.append(aRegister);


//   <a href="/login"><button class="btn btn-outline-primary ml-3" type="submit">로그인</button></a>
//   <a href="/register"><button class="btn btn-outline-primary ml-3" type="submit">회원가입</button></a>

// <nav class="navbar navbar-expand-lg navbar-light bg-dark">
// <a class="navbar-brand" href="#">
//   <div class="d-inline-block align-top divNavProfile">
//     <img src="/img/68260365.png" class="d-inline-block align-top profileCircle" alt="">
//   </div>
//   Bootstrap
// </a>

// <div class="navbar-collapse">
//   <ul class="navbar-nav mr-auto my-2 my-lg-0 navbar-nav-scroll" style="max-height: 100px;">
//     <li class="nav-item active">
//       <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link" href="/board">게시판</a>
//     </li>
//     <li class="nav-item dropdown">
//       <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
//         게임
//       </a>
//       <ul class="dropdown-menu">
//         <li><a class="dropdown-item" href="#">지뢰찾기</a></li>
//         <li><a class="dropdown-item" href="#">틀린 그림 맞추기</a></li>
//         <li><hr class="dropdown-divider"></li>
//         <li><a class="dropdown-item" href="#">Something else here</a></li>
//       </ul>
//     </li>
//     <li class="nav-item">
//       <a class="nav-link disabled">Link</a>
//     </li>
//   </ul>



// </div>
// </nav>