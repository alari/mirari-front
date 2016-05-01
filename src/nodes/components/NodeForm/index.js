import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map, keys, propOr, isEmpty} from "ramda";
import {TextField, RaisedButton, SelectField, MenuItem, Toggle, LinearProgress, FlatButton} from "material-ui";
import {setChangedFields,saveNode} from "nodes/redux/actions";

const mapStateToProps = (state) => ({
  changed: state.nodes.changed,
  node: state.nodes.node || {
    title: "",
    text: {version: 0, content: ""},
    draft: true,
    kind: "Post"
  },
  progress: state.nodes.progress,
  error: state.nodes.error
})

const mapDispatchToProps = {
  setFields: (data) => setChangedFields(data),
  saveNode: (base, changed) => {
    changed.kind = propOr(base.kind, "kind")(changed)
    return saveNode(base,changed)
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

  const base = props.node

  const changed = props.changed

  const saveNode = () => {
    props.saveNode(base, changed)
  }

  const setField = (field) => (e) => {
    props.setFields({[field]: e.target.value})
  }

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
            value={ propOr(base.title, "title")(changed) }
            errorText={ pickError("title") }
        />

        <TextField
            hintText="Основной текст"
            floatingLabelText="Основной текст"
            fullWidth={true}
            multiLine={true}
            onChange={(e) => {
              props.setFields({text: {...base.text, content:e.target.value}})
            }}
            rows={12}
            value={ changed.text && changed.text.content || base.text.content }
            errorText={ pickError("text.content") || pickError("text.version") }
        />

        <div>
          <SelectField
              autoWidth={true}
              value={propOr(base.kind, "kind")(changed)}
              onChange={(event, index, value) => {
                props.setFields({"kind": value})
              }}
              errorText={ pickError("kind") }
          >
            { map((k) => <MenuItem key={k} primaryText={kinds[k]} value={k}/>, keys(kinds)) }
          </SelectField>

          <Toggle
              label="Опубликовать"
              labelPosition="right"
              toggled={ !propOr(base.draft, "draft")(changed) }
              onToggle={(e) => {
              props.setFields({"draft": !propOr(base.draft, "draft")(changed)})
              }}
          />

          { props.progress ? <LinearProgress /> : <RaisedButton label="Сохранить" primary={true} disabled={isEmpty(changed)} onClick={saveNode}/> }

          { base.id && <Link to={"/nodes/"+base.id}><FlatButton label="На страницу" linkButton={true} secondary={true} /></Link> }

        </div>

      </form>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeForm)
