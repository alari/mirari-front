import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map, keys, propOr, merge, equals, pickBy} from "ramda";
import {TextField, RaisedButton, SelectField, MenuItem, Toggle, LinearProgress, FlatButton} from "material-ui";
import {saveNode} from "nodes/redux/actions";
import {decorateWithState} from "commons/utils";
import {NODES_SAVE} from "nodes/redux/constants";

const mapStateToProps = (state) => ({
  node: (state.nodes.node && state.nodes.node.id === state.resolve.params.nodeId) ? state.nodes.node : {
    title: "",
    text: {version: 0, content: ""},
    layer: "Draft",
    kind: "Post"
  },
  progress: state.nodes.progress,
  error: state.nodes.error
})

const mapDispatchToProps = {
  saveNode: (base, changed) => {
    return saveNode(base, {
      ...changed,
      kind: propOr(base.kind, "kind")(changed)
    })
  }
}

const kinds = {
  Post: "Пост",
  Prose: "Проза",
  Poetry: "Поэзия",
  Article: "Статья",
  Label: "Метка",
  Node: "Нода"
}

const NodeForm = (props) => {

  const node = merge(props.node, props.state)

  const isNotChanged = equals(node, props.node)

  const saveNode = () => {
    props.saveNode(props.node, props.state).then((e) => {
      if (e.type === NODES_SAVE.SUCCESS) {
        props.clearState()
      }
    })
  }

  const setField = props.stateFieldChanged

  const pickError = (field) => {
    return props.error && props.error.fields && props.error.fields[field] && props.error.fields[field].desc
  }

  return (
    <form onSubmit={saveNode}>
      <TextField
        hintText="Заголовок"
        floatingLabelText="Заголовок"
        fullWidth={true}
        onChange={setField("title")}
        value={ node.title }
        errorText={ pickError("title") }
      />

      <TextField
        hintText="Основной текст"
        floatingLabelText="Основной текст"
        fullWidth={true}
        multiLine={true}
        onChange={(e) => {
              props.setState({text: {...node.text, content:e.target.value}})
            }}
        rows={12}
        value={ node.text.content }
        errorText={ pickError("text.content") || pickError("text.version") }
      />

      <div>
        { node.layer !== "Note" && <SelectField
          autoWidth={true}
          value={ node.kind }
          onChange={(event, index, value) => {
                props.setState({"kind": value})
              }}
          errorText={ pickError("kind") }
        >
          { map((k) => <MenuItem key={k} primaryText={kinds[k]} value={k}/>, keys(kinds)) }
        </SelectField>}

        { node.layer !== "Note" && <Toggle
          label="Опубликовать"
          labelPosition="right"
          toggled={ node.layer === "Pub" }
          onToggle={(e) => {
              props.setState({"layer": node.layer === "Pub" ? "Draft" : "Pub"})
              }}
        />}

        { props.progress ? <LinearProgress /> :
          <RaisedButton label="Сохранить" primary={true} disabled={isNotChanged} onClick={saveNode}/> }

        { node.id && node.layer !== 'Note' &&
        <Link to={"/nodes/"+node.id}><FlatButton label="На страницу" linkButton={true} secondary={true}/></Link> }

      </div>

    </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(NodeForm))
