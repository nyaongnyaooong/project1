import './App.css';
import './nav.css';
import './animation.css';
import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import axios from 'axios';

// const NavBtn = (props) => {
//   let { btnName, clickFunction } = props;
//   console.log(clickFunction)
//   // if(props.BtnAct) btnClass += " btn _login_section"
//   return <button className="btn_login_section" onClick={clickFunction}>{btnName}</button>
// };

// 네비게이션바
const Nav = (props) => {
  const { btnList, btnAct, stateFuncs } = props;
  const { setlgnFrmAct, setBgDarkAct } = stateFuncs;

  const addLi = [];
  for (let i = 1; i < btnList.length; i++) {
    const element = btnList[i];
    if (i === btnAct) {
      addLi.push(
        <li key={i}>
          <button className="btn_nav_page nav_btn_active" onClick={() => {
            props.btnClick(i);
          }}>{element}
          </button>
        </li>
      )
    } else {
      addLi.push(
        <li key={i}>
          <button className="btn_nav_page nav_btn_deactive" onClick={() => {
            props.btnClick(i);
          }}>
            {element}
          </button>
        </li>
      )
    }
  };

  return (
    <div className="navbar">
      {/* Navigationbar left section */}
      <div className="nav_l_section">
        <div className="nav_img_div" >
          <img src="./public/68260365.png" className="profileCircle" alt=""></img>
        </div>
        <button className={"btn_nav_page " + (btnAct === 0 ? "nav_btn_active" : "nav_btn_deactive")} onClick={() => {
          props.btnClick(0);
        }}><Link to="/">NyaongNyaooong</Link></button>
      </div>

      {/* Navigationbar mid section */}
      <div className="nav_m_section">
        <ul>
          {addLi};
        </ul>
      </div>

      {/* Navigationbar right section */}
      <div className="nav_r_section">
        <button className="btn_login_section" onClick={() => {
          setlgnFrmAct(true);
          setBgDarkAct(true);
        }}>LogIn</button>
        <button className="btn_login_section">Register</button>
      </div>
    </div>
  )
};

const LogInForm = (props) => {
  const { active } = props;
  return (
    <div className={(active) ? "login_box ani_fadeInUp" : "login_box zhide"}>
      <form action="/login/post" method="POST">
        <div className="form_group"></div>

        <div className="form_group">
          <span className="login_form_title">NyaongNyaooong</span>
          {/* <!-- <img src="/img/68260365.png"></img> --> */}
        </div>

        <div className="form_group">
          <span className="wrong_form"></span>
        </div>

        <div className="form_group">
          <div className="input_group">
            <input type="text" aria-describedby="emailHelp" placeholder="아이디" name="id"></input>
          </div>
        </div>

        <div className="form_group">
          <div className="input_group">
            <input type="password" placeholder="비밀번호" name="pw"></input>
          </div>
        </div>

        <div className="form_group">
          <div className="button_group">
            <button type="submit" className="btn btn-primary">로그인</button>
          </div>
        </div>

        <div className="form_group">
          <div className="divine_line_group">
            <div className="divine_line_box">
              <div className="divine_line"></div>
            </div>

            <div className="divine_line_box_mid">
              <div className="divine_line_text">
                <span>또는</span>
              </div>
            </div>

            <div className="divine_line_box">
              <div className="divine_line"></div>
            </div>
          </div>
        </div>

        <div className="form_group">
          <span className="login_form_title">OAuth2 예정</span>
        </div>

        <div className="form_group">
        </div>

        <div className="form_group">
        </div>
      </form>
    </div>
  )
};

const BgDarker = (props) => {
  const { active, deactivate } = props;
  if (active) return (<div id="fadeOut" className="ani_fadeInDark" onClick={deactivate}></div>)
  else return (<div id="fadeOut" className="zhide"></div>)
}

const Home = () => {
  return (
    <div className="content_box visible ani_fadeIn" id="home">
      <p>
        Hello Blog
        {/* <!-- 안녕하세요
    현재 NodeJS를 사용하여 Back-End 개발 공부 중 입니다

    https://github.com/nyaongnyaooong
    https://career.programmers.co.kr/pr/luckyyou123_7068

    HTML CSS JavaScript NodeJS MongoDB MySQL --> */}
        {/* <!-- <svg width="32" height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
    </svg> --> */}
        {/* <!-- <path fill-rule="evenodd" clip-rule="evenodd" d="M10 10h60c5.523 0 10 4.477 10 10v60c0 5.523-4.477 10-10 10H10C4.477 90 0 85.523 0 80V20c0-5.523 4.477-10 10-10z" fill="#202B3D"></path> --> */}

      </p>
    </div>
  )
}

const Blog = () => {
  return (
    <div className="content_box ani_fadeIn" id="blog">
      <p>
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
        blogblogblogblogblogblogblogblogblogblogblog<br />
      </p>
    </div>
  )
}

const Board = () => {
  return (
    <div className="content_box ani_fadeIn" id="board">
      <table className="">
        <tbody className="boardTable">
          <tr>
            <td className="제목">
              <span>제목</span>
            </td>
            <td className="글쓴이">
              <span>글쓴이</span>
            </td>
            <td className="조회수">
              <span>조회수</span>
            </td>
            <td className="날짜">
              <span>날짜</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const navBtnList = ["NyaongNyaooong", "Blog", "Board", "menu1", "menu2"];

  let [navBtnAct, setNavBtnAct] = useState(false);
  let [lgnFrmAct, setlgnFrmAct] = useState(false);
  let [bgDarkAct, setBgDarkAct] = useState(false);

  const stateFunctions = {
    setNavBtnAct: setNavBtnAct,
    setlgnFrmAct: setlgnFrmAct,
    setBgDarkAct: setBgDarkAct,
  };

  return (
    <BrowserRouter>

      {/* background shadow animation */}
      <BgDarker active={bgDarkAct} deactivate={() => { setBgDarkAct(false); setlgnFrmAct(false); }}></BgDarker>
      {/* <div id="fadeOut" className="zhide"></div> */}
      {/* /background shadow animation */}

      <div className="container">
        {/* <!-- Left Section --> */}
        <div className="leftSection"></div>
        {/* <!-- /Left Section --> */}

        {/* <!-- Middle Section --> */}
        <div className="middleSection">
          {/* <!-- 네비게이션바 --> */}
          <Nav btnList={navBtnList} btnAct={navBtnAct} btnClick={(btnNumber) => { setNavBtnAct(btnNumber) }} states={[lgnFrmAct]} stateFuncs={stateFunctions} />
          {/* <!-- /네비게이션바 --> */}

          {/* <!-- Content --> */}
          <div className="content">
            <ul>
              <li><Link to="/">To Home</Link></li>
              <li><Link to="/blog">To blog</Link></li>
              <li><Link to="/board">To board</Link></li>
            </ul>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/blog" element={<Blog></Blog>}></Route>
              <Route path="/board" element={<Board></Board>}></Route>
            </Routes>
          </div>
          {/* <!-- /Content --> */}
        </div>
        {/* <!-- /Middle Section --> */}

        {/* <!-- Right Section --> */}
        <div className="rightSection"></div>
        {/* <!-- /Right Section --> */}
      </div>

      {/* <!-- Login Form --> */}

      <LogInForm active={lgnFrmAct}></LogInForm>
      {/* /Login Form */}

      <div className="footer"></div>






    </BrowserRouter >
  );
}

export default App;
