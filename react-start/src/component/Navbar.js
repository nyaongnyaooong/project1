import { Link } from 'react-router-dom';

import '../css/navbar.css'

const Nav = (props) => {
  const { btnList, btnAct, stateFuncs } = props;
  const { setNavBtnAct, setlgnFrmAct, setBgDarkAct } = stateFuncs;

  const BtnLeftSect = () => {
    return (
      <Link to="/">
        <button className={"btn_nav_page " + (btnAct === 0 ? "nav_btn_active" : "nav_btn_deactive")} onClick={() => {
          setNavBtnAct(0);
        }}>NyaongNyaooong</button>
      </Link>
    )
  }

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


  return (
    <div className="navbar">
      {/* Navigationbar left section */}
      <div className="nav_l_section">
        <div className="nav_img_div" >
          <img src="./68260365.png" className="profileCircle" alt=""></img>
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

export default Nav;