import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {setCredentials, login} from "auth/redux/actions";

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
    e.preventDefault()
    props.login(props.credentials, props.query.next)
  }

  const pickError = (field) => {
    return props.error && props.error.fields && props.error.fields[field]
  }

  return <form onSubmit={login}>
    <fieldset label="email">
      <input type="email" onChange={ onChange("email") } value={props.credentials.email}/>
      { pickError("email") }
    </fieldset>
    <fieldset label="password">
      <input type="password" onChange={ onChange("password") } value={props.credentials.password}/>
      { pickError("password") }
    </fieldset>
    { props.progress ? <div>loading...</div> : <div>
      <Link to="/auth/up">
        Регистрация
      </Link>
      <input type="submit" label="Войти"/>
    </div> }

  </form>
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInView)