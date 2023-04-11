import { useState } from 'react';
import axios from 'axios';

const FormGroup = (props) => {
  const { children } = props;
  return (
    <div className="form_group">
      {children}
    </div>
  )
}

const InputGroup = (props) => {
  const { children } = props;
  return (
    <div className="input_group">
      {children}
    </div>
  )
}

const ButtonGroup = (props) => {
  const { children } = props;
  return (
    <div className="button_group">
      {children}
    </div>
  )
}

const DivLineGroup = (props) => {
  const { children } = props;
  return (
    <div className="divine_line_group">
      {children}
    </div>
  )
}




const LogInForm = (props) => {
  const { active } = props;

  let [inputID, setInputID] = useState('');
  let [inputPW, setInputPW] = useState('');

  const reqLogIn = () => {
    const fetchData = async () => {
      const reqObject = {
        loginID: inputID,
        loginPW: inputPW
      };
      try {
        const result = await axios.post('/login/post', reqObject);
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }

  const getID = (e) => {
    setInputID(e.target.value);
  }

  const getPW = (e) => {
    setInputPW(e.target.value);
  }

  return (
    <div className={(active) ? "login_box ani_fadeInUp" : "login_box zhide"}>
      <form action="/login/post" method="POST">
        <FormGroup />

        <FormGroup>
          <span className="login_form_title">NyaongNyaooong</span>
        </FormGroup>

        <FormGroup>
          <span className="wrong_form">
            {/* 로그인 요청에 문제 발생시 여기에 메세지 표시 */}
            ex Wrong Password
          </span>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <input type="text" placeholder="아이디" onChange={getID} value={inputID}></input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <input type="password" placeholder="비밀번호" onChange={getPW} value={inputPW}></input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonGroup>
            <button type="submit" onClick={reqLogIn} className="btn btn-primary">로그인</button>
          </ButtonGroup>
        </FormGroup>

        <FormGroup>
          <DivLineGroup>
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
          </DivLineGroup>
        </FormGroup>

        <FormGroup>
          <span className="login_form_title">OAuth2 예정</span>
        </FormGroup>

        <FormGroup />
        <FormGroup />
      </form>
    </div>
  )
};

const RegisterForm = (props) => {

  const { active } = props;


  return (
    <div className={(active) ? "login_box ani_fadeInUp" : "login_box zhide"}>
      <form action="/register/post" method="POST">
        <FormGroup />

        <FormGroup>
          <span className="login_form_title">Register</span>
        </FormGroup>

        <FormGroup>
          <span className="wrong_form">
            {/* 회원가입 요청에 문제 발생시 여기에 메세지 표시 */}
            ex Wrong Password
          </span>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <input type="text" aria-describedby="emailHelp" placeholder="아이디" name="regID"></input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <input type="password" placeholder="비밀번호" name="regPW"></input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonGroup>
            <button type="submit" className="btn btn-primary">회원가입</button>
          </ButtonGroup>
        </FormGroup>

        <FormGroup>
          <DivLineGroup>
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
          </DivLineGroup>
        </FormGroup>

        <FormGroup>
          <span className="login_form_title">OAuth2 예정</span>
        </FormGroup>

        <FormGroup />
        <FormGroup />
      </form>
    </div>
  )
};

export { LogInForm, RegisterForm };