import "./styles.css";
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {login} from "commons/auth";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";
import {decorateWithState} from "commons/utils";

const mapStateToProps = (state) => ({
  query: state.state.query,
  error: state.auth._error,
  progress: state.auth._progress
})

const mapDispatchToProps = {
  login: ({email, password}, redirectLocation) => login(email, password, redirectLocation)
}

const SignInView = (props) => {
  const onChange = props.stateFieldChanged

  const login = (e) => {
    props.login(props.state, props.query.next)
  }

  const pickError = (field) => {
    return props.error && props.error.fields && props.error.fields[field]
  }

  return (
      <form onSubmit={(e) => {e.preventDefault(); login()}}>
        <div>
          <TextField
              errorText={ pickError("email") }
              onChange={ onChange('email') }
              value={ props.state['email'] || "" }
              hintText="E-mail"
              fullWidth={true}
              type="email"/>
        </div>
        <div>
          <TextField
              errorText={ pickError("password") }
              onChange={ onChange('password') }
              value={ props.state['password'] || "" }
              hintText="Пароль"
              fullWidth={true}
              type="password"/>
        </div>
        { props.error && <div>
          [{ props.error && props.error.desc }]
        </div> }

        { props.progress ? <LinearProgress /> : <div>
          <Link to="/auth/up">
            <FlatButton
                linkButton={true}
                label="Регистрация"
                secondary={true}
            />
          </Link>
          <RaisedButton label="Войти" primary={ true } onClick={ login }/>
        </div>}
      </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(SignInView))