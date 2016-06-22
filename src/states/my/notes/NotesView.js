import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from "ramda";
import {getNodesList} from "nodes/redux/actions";
import LoadMore from "commons/pagination/components/LoadMore";
import {Card, CardItem, CardDivider, CardRows, CardRow} from "commons/cards/components";
import moment from 'moment';
import {decorateWithState} from "commons/utils";
import {saveNode} from "nodes/redux/actions";
import {LinearProgress, RaisedButton, FlatButton, TextField} from "material-ui"

const mapStateToProps = (state) => ({
  nodes: state.nodes.list,
  nodeId: state.resolve.params.nodeId
})

const mapDispatchToProps = {
  setPage: (p)=>
      getNodesList({...p, layer: "Draft"})
}

const NoteFormInitial = {
  title: "",
  text: {version: 0, content: ""},
  inProgress: false
}

const NoteFormView = ({state: {title, text, inProgress, error}, setState, stateFieldChanged, saveNode}) => {
  const action = () => {
    setState({inProgress: true})
    saveNode({
      layer: "Note",
      kind: "Node",
      title,
      text
    }).then(({error = false}) => {
      if(!!error) {
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
      hintText="Название"
      floatingLabelText="Название"
      fullWidth={true}
      onChange={stateFieldChanged("title")}
      value={ title }
      errorText={ pickError("title") }
    />

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
        <FlatButton label="Сбросить" disabled={!text.content && !title} onClick={() => setState(NoteFormInitial)}/>

        <RaisedButton label="Сохранить" primary={true} disabled={!text.content} onClick={action}/>
      </div> }

    <div>

    </div>
  </form>)
}

const NoteForm = connect(null, {
  saveNode: (data) => saveNode({}, data)
})(decorateWithState(NoteFormView, {initialState: NoteFormInitial}))

const NotesView = ({nodes, setPage, nodeId}) => {

  const haveMore = nodes.values.length < nodes.total

  const loadMore = () => setPage({append: true, limit: nodes.limit, offset: nodes.offset + nodes.limit})

  return (
      <div>

        <NoteForm/>

        { map((n) =>
          <Card key={n.id} isActive={n.id === nodeId}>
            <CardItem>
              <Link to={"/my/notes/"+n.id}>{n.title || "***"}, {moment(n.lastUpdated).fromNow()}</Link>
            </CardItem>
          </Card>, nodes.values) }

        <LoadMore action={loadMore} haveMore={haveMore}/>

      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesView)
