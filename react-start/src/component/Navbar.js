import { Link } from 'react-router-dom';

import '../css/navbar.css'

const Nav = (props) => {
  const { btnList, btnAct, stateFuncs, userData } = props;
  const { setNavBtnAct, setlgnFrmAct, setBgDarkAct } = stateFuncs;

  //left section (로고, 이름)
  const BtnLeftSect = () => {
    return (
      <Link to="/">
        <button className={"btn_nav_page " + (btnAct === 0 ? "nav_btn_active" : "nav_btn_deactive")} onClick={() => {
          setNavBtnAct(0);
        }}>NyaongNyaooong</button>
      </Link>
    )
  }

  //middle section (navigate buttons)
  const BtnMidSect = () => {
    const btnArray = [];
    for (let i = 1; i < btnList.length; i++) {
      const btnName = btnList[i];
      let btnClass = "btn_nav_page ";

      (i === btnAct) ? btnClass += "nav_btn_active" : btnClass += "nav_btn_deactive";
      btnArray.push(
        <li key={i}>
          <Link to={"/" + btnName.toLowerCase()}>
            <button className={btnClass} onClick={() => { setNavBtnAct(i); }}>
              {btnName}
            </button>
          </Link>
        </li>
      )
    };
    return btnArray;
  }

  function BtnRightSect() {
    console.log(userData)
    if (userData) {
      return (
        <div className="nav_r_section">
          <span>환영합니다 {userData.userid}님</span>
          <a href="http://localhost:8080/logout"><button className="btn_login_section">LogOut</button></a>
        </div>
      )
    }
    return (
      <div className="nav_r_section">
        <button className="btn_login_section" onClick={() => {
          setlgnFrmAct(true);
          setBgDarkAct(true);
        }}>LogIn</button>
        <button className="btn_login_section">Register</button>
      </div>
    );
  };

  return (
    <div className="navbar">
      {/* Navigationbar left section */}
      <div className="nav_l_section">
        <div className="nav_img_div" >
          <img src="../68260365.png" className="profileCircle" alt=""></img>
        </div>
        <BtnLeftSect></BtnLeftSect>
      </div>

      {/* Navigationbar mid section */}
      <div className="nav_m_section">
        <ul>
          <BtnMidSect></BtnMidSect>
        </ul>
      </div>

      {/* Navigationbar right section */}
      <BtnRightSect />

    </div>
  )
};

export default Nav;