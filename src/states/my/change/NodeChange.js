import './style.css';
import React from 'react';
import { TriptychContent, TriptychWrapContent, TriptychRight } from 'triptych';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map, keys, propOr, merge, equals, pickBy, isEmpty, find } from 'ramda';
import {
  TextField,
  RaisedButton,
  SelectField,
  MenuItem,
  Toggle,
  LinearProgress,
  FlatButton,
  AutoComplete
} from 'material-ui';
import { saveNode, deleteNode, getNodesList } from 'nodes/redux/actions';
import { decorateWithState } from 'commons/utils';
import { NODES_SAVE } from 'nodes/redux/constants';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { push } from 'react-router-redux';
import kinds from 'nodes/utils/kinds';
import Button from 'commons/button';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NodeContext from './NodeContext';
import { FileInput } from 'commons/files/components';


const mapStateToProps = (state) => ({
  node: (state.nodes.node && state.nodes.node.id === state.resolve.params.nodeId) ? state.nodes.node : {
    title: "",
    description: "",
    text: { version: 0, content: "" },
    layer: "Draft",
    kind: "Post"
  },
  pathname: state.resolve.pathname,
  query: state.resolve.query,
  seriesList: state.nodes.series && state.nodes.series.values || [],
  projects: state.projects.list
})

const mapDispatchToProps = {
  saveNode: (base, changed) => {
    return saveNode(base, {
      ...changed,
      kind: propOr(base.kind, "kind")(changed)
    })
  },
  createSeries: (title, projectId) => {
    return saveNode({}, { title, kind: 'Series', layer: 'Draft', projectId }, true)
  },
  deleteNode: (id) => deleteNode(id),
  redirect: (url) => push(url),
  getNodesList: (params) => getNodesList(params)
}

const NodeChange = ({ node, projects, seriesList, createSeries, getNodesList, state: { contextOpened = true, inProgress = false, deleting = false, error, ...state }, setState, clearState, stateFieldChanged, deleteNode, saveNode, redirect, pathname, query }) => {

  const actualNode = merge(node, state)

  const isNotChanged = isEmpty(state)

  const action = () => {
    setState({
      error: null,
      inProgress: true,
      deleting: false
    })
    saveNode(actualNode, state).then(({ error = false }) => {
      if (error) {
        setState({
          error: error.body,
          inProgress: false
        })
      } else {
        clearState({
          inProgress: false,
          contextOpened
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
      redirect({ pathname: pathname.substring(0, pathname.indexOf(node.id) - 1), query })
    })
  }

  const seriesOnInput = (e) => {
    getNodesList({
      key: "series",
      q: e,
      layer: '!Note',
      projectId: actualNode.projectId
    })
  }

  const seriesOnRequest = (e, i) => {
    if (i >= 0) {
      setState({ inSeries: seriesList[i], seriesId: seriesList[i].id })
    } else {
      createSeries(e, actualNode.projectId).then(({ error = false, result }) => {
        if (!error) {
          setState({
            inSeries: result.body,
            seriesId: result.body.id
          })
        }
      })
    }
  }

  const seriesFilter = (q, t) => {
    return true
  }

  return (<TriptychWrapContent><TriptychContent header={{
    title: actualNode.title,
    button: <Button color="default" icon={<NavigationArrowForward/>} mobile size="m" title="Контекст" onClick={toggleContext} />
  }}>

    <form className="Content Form" onSubmit={action}>
      <TextField
        hintText="Заголовок"
        floatingLabelText="Заголовок"
        fullWidth={true}
        onChange={stateFieldChanged("title")}
        value={ actualNode.title }
        errorText={ pickError("title") }
      />

      <div className="Form-item">
        <FileInput label="Загрузить обложку" onUpload={(i) => setState({ imageId: i.id })} />
      </div>

      {actualNode.imageId &&
        <div className="Form-item">
          <img
            className="Form-cover"
            src={`/api/images/${actualNode.imageId}`}
            role="presentation"
          />
        </div>
      }

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

      <AutoComplete
        autoWidth={true}
        hintText="Сериал/Коллекция"
        floatingLabelText="Сериал/Коллекция"
        onUpdateInput={seriesOnInput}
        dataSource={map(k => k.title, seriesList)}
        searchText={actualNode.inSeries && actualNode.inSeries.title || ''}
        openOnFocus={true}
        onNewRequest={seriesOnRequest}
        filter={seriesFilter}
      />

      { projects && projects.values && <SelectField
        autoWidth={true}
        value={ actualNode.projectId }
        onChange={(event, index, value) => {
          setState({
            projectId: value,
            project: value && find(p => p.id === value, projects.values),
            seriesId: null,
            inSeries: null
          })
          getNodesList({
            key: "series",
            layer: '!Note',
            projectId: value
          })
        }}
        errorText={ pickError("projectId") }
      >
        <MenuItem primaryText={<i>Нет</i>} value={null}/>
        { map((p) => <MenuItem key={p.id} primaryText={p.title} value={p.id} />, projects.values) }
      </SelectField>}

      <div>
        { actualNode.layer !== "Note" && <SelectField
          autoWidth={true}
          value={ actualNode.kind }
          onChange={(event, index, value) => {
                setState({"kind": value})
              }}
          errorText={ pickError("kind") }
        >
          { map((k) => <MenuItem key={k} primaryText={kinds[k]} value={k} />, keys(kinds)) }
        </SelectField>}

        { actualNode.layer !== "Note" && <Toggle
          label="Опубликовать"
          labelPosition="right"
          toggled={ actualNode.layer === "Pub" }
          onToggle={(e) => {
              setState({"layer": actualNode.layer === "Pub" ? "Draft" : "Pub"})
              }}
        />}

        { actualNode.layer !== "Note" && <TextField
          label="Адрес"
          hintText="Адрес, https://mirari.ru/..."
          floatingLabelText={"Адрес, https://mirari.ru/"+(actualNode.alias || "...")}
          fullWidth={true}
          onChange={stateFieldChanged("alias")}
          value={ actualNode.alias || "" }
          errorText={ pickError("alias") }
        />}

        { inProgress ? <LinearProgress /> :
          <RaisedButton label="Сохранить" primary={true} disabled={isNotChanged} onClick={action} /> }

        { actualNode.id && !inProgress &&
        <FlatButton icon={<ActionDelete/>} label={deleting && "Удалить"} secondary={true}
                    onClick={ () => deleting ? actionDelete() : setState({deleting: true}) } /> }

        { actualNode.id && actualNode.layer !== 'Note' &&
        <FlatButton label="На страницу" onClick={() => redirect("/nodes/"+actualNode.id)} secondary={true} />}

      </div>

    </form>

  </TriptychContent>
    { contextOpened && <TriptychRight onClose={toggleContext}>
      <NodeContext node={actualNode} />
    </TriptychRight> }
  </TriptychWrapContent>)
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(NodeChange))
