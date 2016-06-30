import './style.css';
import React from 'react';
import {decorateWithState} from "commons/utils";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";
import {connect} from "react-redux";
import {merge,equals} from 'ramda'
import {saveUser} from 'users/redux/actions'
import {FileInput} from 'commons/files/components'

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.users._error,
  progress: state.users._progress
})

const mapDispatchToProps = {
  saveUser: (id, data) => saveUser(id, data)
}

const ProfileFormView = (props) => {

  const pickError = (field) => {
    return props.error && props.error.fields && props.error.fields[field]
  }

  const user = merge(props.user, props.state)

  const isNotChanged = equals(user, props.user)

  return (
    <div className="ProfilePage">
      <form className="ProfileForm" onSubmit={(e) => {e.preventDefault(); props.saveUser(user.id, props.state)}}>
        <div className="ProfileForm-avatarGroup">
          {(user.imageId || user.avatarUrl) &&
            <div className="ProfileForm-avatarContainer">
              <img className="ProfileForm-avatar" src={user.imageId ? ("/api/images/"+user.imageId) : user.avatarUrl}/>
            </div>
          }

          <FileInput label="Загрузить аватарку" onUpload={(i) => props.setState({imageId: i.id})}/>
        </div>

        <TextField
          errorText={ pickError("username") }
          onChange={ (e) => props.setState({username: e.target.value.toLowerCase().replace(/[^-a-z0-9]/g, '')}) }
          value={ user['username'] || "" }
          hintText="username"
          floatingLabelText="username"
          fullWidth={true}
          type="text"/>

        <TextField
            errorText={ pickError("firstName") }
            onChange={ props.stateFieldChanged('firstName') }
            value={ user['firstName'] || "" }
            hintText="Имя"
            floatingLabelText="Имя"
            fullWidth={true}
            type="text"/>

        <TextField
            errorText={ pickError("lastName") }
            onChange={ props.stateFieldChanged('lastName') }
            value={ user['lastName'] || "" }
            hintText="Фамилия"
            floatingLabelText="Фамилия"
            fullWidth={true}
            type="text"/>


        { props.progress ? <LinearProgress /> :
          <RaisedButton label="Сохранить" primary={true} disabled={isNotChanged} type="submit"/> }
      </form>

      <hr/>

      <p><a href={"https://telegram.me/MirariBot?start=" + user.id} target="_blank">Привязать телеграм-аккаунт</a></p>
      <p>Это позволит вам писать заметки и отвечать на комментарии через Telegram</p>
  </div>)

}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(ProfileFormView))
