const LogInForm = (props) => {
  const { active } = props;

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

  return (
    <div className={(active) ? "login_box ani_fadeInUp" : "login_box zhide"}>
      <form action="/login/post" method="POST">
        <FormGroup></FormGroup>

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
            <input type="text" aria-describedby="emailHelp" placeholder="아이디" name="id"></input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup>
            <input type="password" placeholder="비밀번호" name="pw"></input>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonGroup>
            <button type="submit" className="btn btn-primary">로그인</button>
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

        <FormGroup></FormGroup>

        <FormGroup></FormGroup>
      </form>
    </div>
  )
};

export default LogInForm;