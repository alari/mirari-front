import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {TextField, LinearProgress, RaisedButton} from "material-ui";
import {connect} from "react-redux"

import {commentNode} from "nodes/redux/actions"
import {decorateWithState} from "commons/utils"

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  actionComment: (id, data) => commentNode(id, data)
}

const CommentForm = ({state: { content = "", error, inProgress = false }, setState, stateFieldChanged, nodeId, actionComment, replyTo, onSaved = () => {}}) => {

  const pickError = (field) => error && error.fields && error.fields[field] && error.fields[field].desc

  const action = () => {
    setState({
      inProgress: true,
      error: null
    })
    actionComment(nodeId, {content, replyTo}).then(({error = false, result}) => {
      if(error) {
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
    <div className="CommentForm">
      <TextField
        hintText="Комментарий"
        floatingLabelText="Комментарий"
        fullWidth={true}
        onChange={stateFieldChanged("content")}
        value={ content }
        errorText={ pickError("content") }
      />

      { inProgress ? <LinearProgress/> : <div>

        <RaisedButton label="Сохранить" primary={true} disabled={!content} onClick={action}/>

      </div> }

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(CommentForm))
