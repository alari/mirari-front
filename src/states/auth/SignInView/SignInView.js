import "states/auth/styles.css";
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {login} from "commons/auth";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";
import {decorateWithState} from "commons/utils";
import {push} from "react-router-redux"

const mapStateToProps = (state) => ({
  next: state.resolve.query.next
})

const mapDispatchToProps = {
  login: ({email, password}) => login(email, password),
  redirect: (url) => push(url)
}

const SignInView = ({state: {error, email = "", password = "", inProgress = false}, setState, stateFieldChanged, next, login, redirect}) => {

  const action = () => {
    setState({
      error: null,
      inProgress: true
    })
    login({email, password}).then(({error = false}) => {
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

  return (
      <form className="AuthForm" onSubmit={(e) => {e.preventDefault(); action()}}>
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
            <RaisedButton label="Войти" primary={ true } disabled={!password || !email} onClick={ action }/>
            <div className="AuthForm-footerDivider" />
            <Link to="/auth/recovery">Забыли пароль?</Link>
          </div>

          <div className="AuthForm-footerAside">
          <div className="AuthForm-footerAside-title">Еще нет аккаунта?</div>
          <Link to="/auth/up">Зарегистрироваться</Link>
          </div>
        </div>}
      </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(SignInView))
