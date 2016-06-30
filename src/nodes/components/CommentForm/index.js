import "./styles.css";
import React from "react";
import {Link} from "react-router";
import {TextField, LinearProgress, RaisedButton, FlatButton} from "material-ui";
import {connect} from "react-redux";
import {commentNode} from "nodes/redux/actions";
import {decorateWithState} from "commons/utils";

const mapStateToProps = (state) => ({
  pathname: state.resolve.pathname,
  userId: state.auth.userId
})

const mapDispatchToProps = {
  actionComment: (id, data) => commentNode(id, data)
}

const CommentForm = ({
  state: {content = "", error, inProgress = false}, setState, stateFieldChanged, nodeId, actionComment, replyTo, userId, pathname, onSaved = () => "", onCancel}) => {

  const pickError = (field) => error && error.fields && error.fields[field] && error.fields[field].desc

  const action = () => {
    setState({
      inProgress: true,
      error: null
    })
    actionComment(nodeId, {content, replyTo}).then(({error = false, result}) => {
      if (error) {
        setState({
          inProgress: false,
          error: error.body
        })
      } else {
        setState({
          inProgress: false,
          content: ""
        })
        onSaved(result.body)
      }
    })
  }

  return (
    userId ? <div className="CommentForm">
      <TextField
        hintText="Комментарий"
        floatingLabelText="Комментарий"
        fullWidth={true}
        multiLine={true}
        onChange={stateFieldChanged("content")}
        value={ content }
        errorText={ pickError("content") }
      />

      { inProgress ? <LinearProgress/> : <div>

        <RaisedButton label="Сохранить" primary={true} disabled={!content} onClick={action}/>
        { onCancel && <FlatButton label="Отменить" onClick={onCancel}/>}

      </div> }

    </div> : <div className="CommentForm-authInfo">
      Вы не авторизованы. <Link to={"/auth/in?next="+pathname}>Войдите</Link> или <Link to={"/auth/up?next="+pathname}>зарегистрируйтесь</Link>,
      чтобы комментировать.
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(CommentForm))
