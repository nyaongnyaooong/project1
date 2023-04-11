import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './css/App.css';
import './css/animation.css';
import { LogInForm, RegisterForm } from './component/LogInForm'
import Nav from './component/Navbar'
// import Loading from './component/Loading'
import { Blog } from './component/BlogRouter'
import { Home, Board, BoardPostCreate, BoardPostRead, BoardPostUpdate } from './component/BoardRouter'
import axios from 'axios';



const BgDarker = (props) => {
  const { active, stateFuncs } = props;
  const { setBgDarkAct, setLgnFrmAct, setRegFrmAct } = stateFuncs;
  const divDark = useRef(null);

  // 검은 배경 클릭 했을 때
  const onClickFunction = () => {
    setBgDarkAct(false);
    setLgnFrmAct(false);
    setRegFrmAct(false);

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
  const urlPath = window.location.pathname;
  const comparePath = urlPath.split('/')
  navBtnList.forEach((e, i) => {
    if (comparePath[1] === e.toLowerCase()) nowPageState = i;
  });
  // axios.get("http://localhost:8080/userdata")
  // .then((response) => {
  //   console.log(response);
  // })
  // .catch((error) => {
  //   console.log("에러발생 : ", error)
  // });
  let [navBtnAct, setNavBtnAct] = useState(nowPageState);
  let [lgnFrmAct, setLgnFrmAct] = useState(false);
  let [regFrmAct, setRegFrmAct] = useState(false);
  let [bgDarkAct, setBgDarkAct] = useState(false);
  let [userData, setUserData] = useState(null);
  // let [loading, setLoading] = useState(true);

  const stateFunctions = {
    setNavBtnAct,
    setLgnFrmAct,
    setRegFrmAct,
    setBgDarkAct,
    setUserData,
  };

  // 최초 랜더링 시 로그인 정보 검증
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('/userdata');
      setUserData(result.data);
    }
    fetchData();
    console.log('렌더링됨');
  }, [])

  // setTimeout(() => {
  //   setLoading(false);
  // }, 900);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>

      {/* <Loading active={loading} /> */}

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
          <Nav btnList={navBtnList} btnAct={navBtnAct} stateFuncs={stateFunctions} userData={userData} />
          {/* <!-- /네비게이션바 --> */}

          {/* <!-- Content --> */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/blog" element={<Blog></Blog>}></Route>
              <Route path="/board" element={<Board></Board>}></Route>
              <Route path="/board/write" element={<BoardPostCreate />}></Route>
              <Route path="/board/:id" element={<BoardPostRead />}></Route>
              <Route path="/board/put/:id" element={<BoardPostUpdate />}></Route>
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

      {/* <!-- Login & Register Form --> */}
      <LogInForm active={lgnFrmAct} />
      <RegisterForm active={regFrmAct} />
      {/* /Login & Register Form */}

      <div className="footer"></div>
    </BrowserRouter >
  );
}

export default App;
