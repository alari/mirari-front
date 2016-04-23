import "./styles.css";
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {setCredentials, login} from "auth/redux/actions";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";

const mapStateToProps = (state) => ({
  query: state.state.query,
  error: state.auth._error,
  progress: state.auth._progress,
  credentials: state.auth.credentials || {}
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: ({email, password}, redirectLocation) => dispatch(login(email, password, redirectLocation)),
    setCredentials: (crds) => dispatch(setCredentials(crds))
  }
}

const SignInView = (props) => {
  const onChange = (fieldName) => (e) => {
    props.setCredentials({[fieldName]: e.target.value})
  }

  const login = (e) => {
    props.login(props.credentials, props.query.next)
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
              defaultValue={ props.credentials['email'] }
              hintText="E-mail"
              fullWidth={true}
              type="email"/>
        </div>
        <div>
          <TextField
              errorText={ pickError("password") }
              onChange={ onChange('password') }
              defaultValue={ props.credentials['password'] }
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInView)