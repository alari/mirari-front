import React from 'react'
import {decorateWithState} from "commons/utils";
import {Paper, TextField, FlatButton, RaisedButton, LinearProgress} from "material-ui";
import {connect} from "react-redux";
import {merge,equals} from 'ramda'
import {saveUser} from 'users/redux/actions'
import {FileInput} from 'commons/files/components'
import {TriptychContent} from "commons/triptych";

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
  
  return (<TriptychContent header={{title:"Настройки профиля"}}><form onSubmit={(e) => {e.preventDefault(); props.saveUser(user.id, props.state)}}>
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

    <FileInput label="Загрузить картинку аватарки" onUpload={(i) => props.setState({imageId: i.id})}/>

    {(user.imageId || user.avatarUrl) && <img src={user.imageId ? ("/api/images/"+user.imageId) : user.avatarUrl}/>}

    { props.progress ? <LinearProgress /> :
        <RaisedButton label="Сохранить" primary={true} disabled={isNotChanged} type="submit"/> }
  </form>

    <hr/>

    <a href={"https://telegram.me/MirariBot?start=" + user.id} target="_blank">Привязать телеграм-аккаунт</a>

  </TriptychContent>)
  
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(ProfileFormView))