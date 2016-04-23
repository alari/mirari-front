import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {setCredentials, signup} from "auth/redux/actions";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";

const mapStateToProps = (state) => ({
  query: state.state.query,
  error: state.auth._error,
  progress: state.auth._progress,
  credentials: state.auth.credentials || {}
})

const mapDispatchToProps = (dispatch) => {
  return {
    signup: ({email, password}, redirect) => dispatch(signup(email, password, redirect)),
    setCredentials: (crds) => dispatch(setCredentials(crds))
  }
}

const SignUpView = (props) => {
  const onChange = (fieldName) => (e) => {
    props.setCredentials({[fieldName]: e.target.value})
  }

  const signup = (e) => {
    e.preventDefault()
    props.signup(props.credentials, props.query.next)
  }

  const pickError = (field) => {
    return props.error && props.error.fields && props.error.fields[field]
  }

  return <form onSubmit={(e) => {e.preventDefault(); signup()}}>
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
      <Link to="/auth/in">
        <FlatButton
            linkButton={true}
            label="Вход"
            secondary={true}
        />
      </Link>
      <RaisedButton label="Зарегистрироваться" primary={ true } onClick={ signup }/>
    </div>}
  </form>
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView)