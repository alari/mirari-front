import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {setCredentials, signup} from "auth/redux/actions";

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
      <Link to="/auth/in">
        Вход
      </Link>
      <input type="submit" label="Зарегистрироваться"/>
    </div> }

  </form>
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView)