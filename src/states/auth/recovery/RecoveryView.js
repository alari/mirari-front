import React from 'react'
import {connect} from "react-redux";
import {decorateWithState} from "commons/utils";
import {authRecoverPassword} from "commons/auth/redux/actions";
import {TextField, RaisedButton, LinearProgress} from "material-ui";
import {Link} from "react-router";

const mapStateToProps = (state) => ({
  token: state.resolve.params.token
})

const mapDispatchToProps = {
  recover: (token, newPass) => authRecoverPassword(token, newPass)
}

const RecoveryView = ({state: {newPass = "", newPassProve = "", newPassProveError = false, done = false, isProgress = false, error = {}}, setState, stateFieldChanged, token, recover}) => {

  const action = () => {
    setState({
      isProgress: true,
      error: {}
    })
    recover(token, newPass).then(({error = false}) => {
      if (!!error) {
        setState({
          isProgress: false,
          error: error.body
        })
      } else {
        setState({
          isProgress: false,
          done: true
        })
      }
    })
  }

  const pickError = (field) => {
    return error && error.fields && error.fields[field]
  }

  return (done ? <div>Пароль успешно восстановлен. Теперь можете <Link to="/auth/in">войти</Link></div> : <form onSubmit={(e) => e.preventDefault() && action()}>
    <TextField
      errorText={ pickError("newPass") }
      onChange={ stateFieldChanged('newPass') }
      value={ newPass }
      hintText="Новый пароль"
      disabled={isProgress}
      type="password"
      fullWidth={true}
    />
    <TextField
      errorText={ newPassProveError && "Пароли не совпадают" }
      onChange={ stateFieldChanged('newPassProve') }
      onFocus={ () => newPassProveError && setState({newPassProveError: false}) }
      onBlur={() => newPass !== newPassProve && setState({newPassProveError: true})}
      value={ newPassProve }
      hintText="Повторите пароль"
      disabled={isProgress || !newPass}
      type="password"
      fullWidth={true}
    />
    <RaisedButton
      label="Установить"
      primary={true}
      disabled={isProgress || !newPass || newPass !== newPassProve}
      onClick={action}
    />
    { isProgress && <LinearProgress/> }
    {error && <div style={{color:"red"}}>{error.desc}</div>}
  </form>)
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(RecoveryView))
