import React from 'react'
import {TriptychContent,TriptychWrapContent,TriptychRight} from "commons/triptych"
import {connect} from "react-redux";
import {Link} from "react-router";
import {map, keys, propOr, merge, equals, pickBy, isEmpty} from "ramda";
import {TextField, RaisedButton, SelectField, MenuItem, Toggle, LinearProgress, FlatButton} from "material-ui";
import {saveNode, deleteNode} from "nodes/redux/actions";
import {decorateWithState} from "commons/utils";
import {NODES_SAVE} from "nodes/redux/constants";
import ActionDelete from "material-ui/svg-icons/action/delete"
import {push} from "react-router-redux"
import kinds from "nodes/utils/kinds"
import Button from "commons/button";
import NodeContext from "./NodeContext"

const mapStateToProps = (state) => ({
  node: (state.nodes.node && state.nodes.node.id === state.resolve.params.nodeId) ? state.nodes.node : {
    title: "",
    description: "",
    text: {version: 0, content: ""},
    layer: "Draft",
    kind: "Post"
  },
  pathname: state.resolve.pathname,
  query: state.resolve.query
})

const mapDispatchToProps = {
  saveNode: (base, changed) => {
    return saveNode(base, {
      ...changed,
      kind: propOr(base.kind, "kind")(changed)
    })
  },
  deleteNode: (id) => deleteNode(id),
  redirect: (url) => push(url)
}

const NodeChange = ({node, state: {contextOpened = false, inProgress = false, deleting = false, error, ...state}, setState, clearState, stateFieldChanged, deleteNode, saveNode, redirect, pathname, query}) => {

  const actualNode = merge(node, state)

  const isNotChanged = isEmpty(state)

  const action = () => {
    setState({
      error: null,
      inProgress: true,
      deleting: false
    })
    saveNode(actualNode, state).then(({error = false}) => {
      if(error) {
        setState({
          error: error.body,
          inProgress: false
        })
      } else {
        clearState({
          inProgress: false
        })
      }
    })
  }

  const toggleContext = () => {
    setState({
      contextOpened: !contextOpened
    })
  }

  const pickError = (field) => error && error.fields && error.fields[field] && error.fields[field].desc

  const actionDelete = () => {
    setState({
      error: null,
      inProgress: true,
      deleting: true
    })
    deleteNode(node.id).then(() => {
      redirect({pathname: pathname.substring(0, pathname.indexOf(node.id)-1), query})
    })
  }

  return (<TriptychWrapContent><TriptychContent header={{
    title: actualNode.title,
    button: <Button color="default" mobile size="m" title="Контекст" onClick={toggleContext} />
  }}>

    <form onSubmit={action}>
      <TextField
        hintText="Заголовок"
        floatingLabelText="Заголовок"
        fullWidth={true}
        onChange={stateFieldChanged("title")}
        value={ actualNode.title }
        errorText={ pickError("title") }
      />

      <TextField
        hintText="Основной текст"
        floatingLabelText="Основной текст"
        fullWidth={true}
        multiLine={true}
        onChange={(e) => {
              setState({text: {...actualNode.text, content:e.target.value}})
            }}
        rows={12}
        value={ actualNode.text.content }
        errorText={ pickError("text.content") || pickError("text.version") }
      />

      { actualNode.layer !== "Note" && <TextField
        hintText="Аннотация (для соцсетей и лент)"
        floatingLabelText="Аннотация"
        fullWidth={true}
        multiLine={true}
        onChange={(e) => setState({description: e.target.value.substring(0, 300)})}
        rows={3}
        value={ actualNode.description }
        errorText={ pickError("description") }
      /> }

      <div>
        { actualNode.layer !== "Note" && <SelectField
          autoWidth={true}
          value={ actualNode.kind }
          onChange={(event, index, value) => {
                setState({"kind": value})
              }}
          errorText={ pickError("kind") }
        >
          { map((k) => <MenuItem key={k} primaryText={kinds[k]} value={k}/>, keys(kinds)) }
        </SelectField>}

        { actualNode.layer !== "Note" && <Toggle
          label="Опубликовать"
          labelPosition="right"
          toggled={ actualNode.layer === "Pub" }
          onToggle={(e) => {
              setState({"layer": actualNode.layer === "Pub" ? "Draft" : "Pub"})
              }}
        />}

        { inProgress ? <LinearProgress /> :
          <RaisedButton label="Сохранить" primary={true} disabled={isNotChanged} onClick={action}/> }

        { actualNode.id && !inProgress && <FlatButton icon={<ActionDelete/>} label={deleting && "Удалить"} secondary={true} onClick={ () => deleting ? actionDelete() : setState({deleting: true}) } /> }

        { actualNode.id && actualNode.layer !== 'Note' &&
        <FlatButton label="На страницу" onClick={() => redirect("/nodes/"+actualNode.id)} secondary={true}/>}

      </div>

    </form>

  </TriptychContent>
    { contextOpened && <TriptychRight onClose={toggleContext}>
      <NodeContext node={actualNode} />
    </TriptychRight> }
  </TriptychWrapContent>)
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(NodeChange))
