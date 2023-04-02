import { useState, useRef } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './css/App.css';
import './css/animation.css';
import LogInForm from './component/LogInForm'
import Nav from './component/Navbar'
import Loading from './component/Loading'
import { Home, Blog, Board } from './component/Router'
// import axios from 'axios';


const BgDarker = (props) => {
  const { active, stateFuncs } = props;
  const { setBgDarkAct, setlgnFrmAct } = stateFuncs;
  const divDark = useRef(null);

  // if(active === "first") {
  //   setBgDarkAct(false);
  //   return <div id="fadeOut" className="zhide"></div>
  // }

  const onClickFunction = () => {
    setBgDarkAct(false);
    setlgnFrmAct(false);
    divDark.current.classList.replace("zhide", "ani_fadeOutDark");
    setTimeout(() => {
      divDark.current.classList.replace("ani_fadeOutDark", "zhide");
    }, 300);
  };

  if (active) return <div ref={divDark} id="fadeOut" className="ani_fadeInDark" onClick={onClickFunction}></div>
  else return <div ref={divDark} id="fadeOut" className="zhide" onClick={onClickFunction}></div>
}

function App() {
  const navBtnList = ["NyaongNyaooong", "Blog", "Board", "menu1", "menu2"];

  let nowPageState = 0;
  navBtnList.forEach((e, i) => {
    if (window.location.pathname === "/" + e.toLowerCase()) nowPageState = i;
  });

  // axios.get("http://localhost:8080/userdata")
  // .then((response) => {
  //   console.log(response);
  // })
  // .catch((error) => {
  //   console.log("에러발생 : ", error)
  // });
  let [navBtnAct, setNavBtnAct] = useState(nowPageState);
  let [lgnFrmAct, setlgnFrmAct] = useState(false);
  let [bgDarkAct, setBgDarkAct] = useState(false);
  let [loading, setLoading] = useState(true);

  const stateFunctions = {
    setNavBtnAct,
    setlgnFrmAct,
    setBgDarkAct,
  };

  setTimeout(() => {
    setLoading(false);
  }, 900);

  return (
    <HashRouter>

      <Loading active={loading} />

      {/* background shadow animation */}
      <BgDarker active={bgDarkAct} stateFuncs={stateFunctions}></BgDarker>
      {/* /background shadow animation */}

      {/* All Section */}
      <div className="container">
        {/* <!-- Left Section --> */}
        <div className="leftSection"></div>
        {/* <!-- /Left Section --> */}

        {/* <!-- Middle Section --> */}
        <div className="middleSection">

          {/* <!-- 네비게이션바 --> */}
          <Nav btnList={navBtnList} btnAct={navBtnAct} stateFuncs={stateFunctions} />
          {/* <!-- /네비게이션바 --> */}

          {/* <!-- Content --> */}
          <div className="content">
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
      {/* /All Section */}

      {/* <!-- Login Form --> */}
      <LogInForm active={lgnFrmAct}></LogInForm>
      {/* /Login Form */}

      <div className="footer"></div>
    </HashRouter >
  );
}

export default App;
