import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './css/App.css';
import './css/animation.css';
import LogInForm from './component/LogInForm'
import Nav from './component/Navbar'
// import Loading from './component/Loading'
import { Home, Blog, Board, BoardNew } from './component/Router'
import axios from 'axios';
axios.defaults.withCredentials = true;



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
  console.log('렌더링됨');
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
  let [lgnFrmAct, setlgnFrmAct] = useState(false);
  let [bgDarkAct, setBgDarkAct] = useState(false);
  let [userData, setUserData] = useState(null);
  // let [loading, setLoading] = useState(true);

  const stateFunctions = {
    setNavBtnAct,
    setlgnFrmAct,
    setBgDarkAct,
  };

  // 최초 랜더링 시 로그인 정보 검증
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:8080/userdata', 
      { withCredentials: 'include' });
      setUserData(result.data);
      console.log('로그인 정보확인', result.data)
    }
    fetchData();
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
              <Route path="/board/write" element={<BoardNew></BoardNew>}></Route>
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
    </BrowserRouter >
  );
}

export default App;
