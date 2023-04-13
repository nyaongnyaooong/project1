import { Link, useNavigate } from 'react-router-dom';

import '../css/navbar.css'

const Nav = (props) => {
  const { btnList, btnAct, stateFuncs, userData } = props;
  const { setNavBtnAct, setLgnFrmAct, setBgDarkAct, setRegFrmAct, setUserData } = stateFuncs;

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

  // right section : user data
  const BtnRightSect = () => {
    const FormUser = () => {
    return (
        <div className="nav_r_section">
          <span>{userData.userid}</span>
          <button className="btn_login_section" onClick={() => {
            document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setUserData(false);
          }}>LogOut</button>
        </div>
      )
    }

    const FormAnonymous = () => {
      return (
        <div className="nav_r_section">
        <button className="btn_login_section" onClick={() => {
          setLgnFrmAct(true);
          setBgDarkAct(true);
        }}>LogIn</button>
        <button className="btn_login_section" onClick={() => {
          setRegFrmAct(true);
          setBgDarkAct(true);
        }}>Register</button>
      </div>
      )
    }

    return userData ? <FormUser /> : <FormAnonymous />
  };

  return (
    <div className="navbar">
      {/* Navigationbar left section */}
      <div className="nav_l_section">
        <div className="nav_img_div" >
          <img src="http://localhost:3000/68260365.png" className="profileCircle" alt=""></img>
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