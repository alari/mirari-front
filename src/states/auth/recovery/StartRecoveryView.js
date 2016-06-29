import React from "react";
import {connect} from "react-redux";
import {decorateWithState} from "commons/utils";
import {authStartPasswordRecovery} from "commons/auth/redux/actions";
import {TextField, RaisedButton, LinearProgress} from "material-ui";

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  start: (email) => authStartPasswordRecovery(email)
}

const StartRecoveryView = ({state: {email = "", done = false, isProgress = false, error = {}}, setState, stateFieldChanged, start}) => {
  const action = () => {
    setState({
      isProgress: true,
      error: {}
    })
    start(email).then(({error = false}) => {
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

  return (done ? <div>Запрос отправлен. Пожалуйста, проверьте вашу почту ({email})</div> :
    <form className="AuthForm" onSubmit={(e) => e.preventDefault() && action()}>
      <div className="AuthForm-itemGroup">
        <TextField
          errorText={ pickError("email") }
          onChange={ stateFieldChanged('email') }
          value={ email }
          hintText="E-mail"
          disabled={isProgress}
          type="email"
        />
      </div>
      <div className="AuthForm-footer">
        <RaisedButton
          label="Восстановить"
          primary={true}
          disabled={isProgress}
          onClick={action}
        />
      </div>
      { isProgress && <LinearProgress/> }
      {error && <div style={{color:"red"}}>{error.desc}</div>}
    </form>)
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(StartRecoveryView))
