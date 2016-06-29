import "states/auth/styles.css";
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {signup} from "commons/auth";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";
import {push} from "react-router-redux"

import {decorateWithState} from "commons/utils"

const mapStateToProps = (state) => ({
  next: state.resolve.query.next
})

const mapDispatchToProps = {
    signup: (data) => signup(data),
    redirect: (url) => push(url)
}

const SignUpView = ({state: {error, email = "", password = "", inProgress = false}, setState, stateFieldChanged, next, signup, redirect}) => {

  const action = (e) => {
    e.preventDefault()
    setState({
      error: false,
      inProgress: true
    })
    signup({email, password}).then(({error = false}) => {
      if(!!error && error.body) {
        setState({
          inProgress: false,
          error: error.body
        })
      } else {
        redirect(next || "/")
      }
    })
  }

  const pickError = (field) => error && error.fields && error.fields[field]

  return <form className="AuthForm" onSubmit={action}>
    <div className="AuthForm-itemGroup">
      <TextField
          errorText={ pickError("email") }
          onChange={ stateFieldChanged('email') }
          value={ email }
          hintText="E-mail"
          fullWidth={true}
          type="email"/>
    </div>
    <div className="AuthForm-itemGroup">
      <TextField
          errorText={ pickError("password") }
          onChange={ stateFieldChanged('password') }
          value={ password }
          hintText="Пароль"
          fullWidth={true}
          type="password"/>
    </div>
    { error && <div style={{color:'red'}}>
      [{ error && error.desc }]
    </div> }

    { inProgress ? <LinearProgress /> : <div className="AuthForm-footer">
      <div className="AuthForm-footerContols">
        <RaisedButton label="Зарегистрироваться" primary={ true } disabled={!email || !password} onClick={ action }/>
        <div className="AuthForm-footerDivider" />
        <Link to="/auth/in">Войти</Link>
      </div>
    </div>}
  </form>
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(SignUpView))
