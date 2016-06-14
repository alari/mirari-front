import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {signup} from "commons/auth";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";

import {decorateWithState} from "commons/utils"

const mapStateToProps = (state) => ({
  query: state.resolve.query,
  error: state.auth._error,
  progress: state.auth._progress
})

const mapDispatchToProps = {
    signup: ({email, password}, redirect) => signup(email, password, redirect)
}

const SignUpView = (props) => {
  const onChange = props.stateFieldChanged

  const signup = (e) => {
    e.preventDefault()
    props.signup(props.state, props.query.next)
  }

  const pickError = (field) => {
    return props.error && props.error.fields && props.error.fields[field]
  }

  return <form onSubmit={(e) => {e.preventDefault(); signup()}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(SignUpView))