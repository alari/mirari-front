import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map, take} from "ramda";
import {getNodesList, saveNode} from "nodes/redux/actions";
import {Card, CardItem, CardDivider, CardRows, CardRow} from "commons/cards/components";
import {decorateWithState} from "commons/utils";
import {LinearProgress, RaisedButton, FlatButton, TextField} from "material-ui";

const NoteFormInitial = {
  title: "",
  text: {version: 0, content: ""},
  inProgress: false
}

const NoteFormView = ({pinToNodeId, state: {text, inProgress, error}, setState, stateFieldChanged, saveNode}) => {
  const action = () => {
    setState({inProgress: true})
    saveNode({
      layer: "Note",
      kind: "Node",
      title: take(64, text.content),
      text,
      pinToNodeId
    }).then(({error = false}) => {
      if (!!error) {
        setState({
          inProgress: false,
          error: error.body
        })
      } else {
        setState(NoteFormInitial)
      }
    })
  }

  const pickError = (field) => error && error.fields && error.fields[field] && error.fields[field].desc

  return (<form onSubmit={action}>
    <TextField
      hintText="Текст"
      floatingLabelText="Текст"
      fullWidth={true}
      multiLine={true}
      onChange={(e) => {
              setState({text: {...text, content:e.target.value}})
            }}
      rows={4}
      value={ text.content }
      errorText={ pickError("text.content") || pickError("text.version") }
    />

    { inProgress ? <LinearProgress /> :
      <div>
        <FlatButton label="Сбросить" disabled={!text.content} onClick={() => setState(NoteFormInitial)}/>

        <RaisedButton label="Сохранить" primary={true} disabled={!text.content} onClick={action}/>
      </div> }

    <div>

    </div>
  </form>)
}

export default connect(null, {
  saveNode: (data) => saveNode({}, data)
})(decorateWithState(NoteFormView, {initialState: NoteFormInitial}))
