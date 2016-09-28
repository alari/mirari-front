import React from 'react';
import { decorateWithState } from 'commons/utils';
import { connect } from 'react-redux';
import { map, isEmpty } from 'ramda';
import { Link } from 'react-router';
import { saveProject } from 'projects/redux/actions';
import pickErrors from 'commons/utils/pickError';
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
import { FileInput } from 'commons/files/components';
import NodesFeed from 'nodes/components/NodesFeed';

const mapStateToProps = (state) => ({
  project: state.projects.project,
});

const mapDispatchToProps = {
  saveProject: ({ id, data, _expand }) => saveProject(data, id, _expand)
}

const ProjectView = ({ state: { inProgress = false, error, ...state }, setState, clearState, stateFieldChanged, project, saveProject }) => {
  const current = {
    ...project,
    ...state
  }

  const pickError = pickErrors(error)

  const action = () => {
    setState({
      error: null,
      inProgress: true
    })
    saveProject({ data: state, id: project.id }).then(({ error=false }) => {
      if (error) {
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

  return (<div>

    <TextField
      hintText="Название"
      floatingLabelText="Название"
      fullWidth={true}
      onChange={stateFieldChanged("title")}
      value={ current.title || "" }
      errorText={ pickError("title") }
    />

    <div className="ProfileForm-avatarGroup">
      {current.imageId && <div className="ProfileForm-avatarContainer">
        <img className="ProfileForm-avatar" src={"/api/images/"+current.imageId} />
      </div>}

      <FileInput label="Загрузить аватарку" onUpload={(i) => setState({imageId: i.id})} />
    </div>

    <TextField
      label="Адрес"
      hintText="Адрес, https://mirari.ru/..."
      floatingLabelText={"Адрес, https://mirari.ru/"+(current.alias || "...")}
      fullWidth={true}
      onChange={stateFieldChanged("alias")}
      value={ current.alias || '' }
      errorText={ pickError('alias') }
    />

    { inProgress ? <LinearProgress /> :
      <RaisedButton label="Сохранить" primary={true} disabled={isEmpty(state)} onClick={action} /> }

    <hr/>
    <h4>Черновики</h4>

    <NodesFeed filter={{ projectId: project.id, layer: 'Draft' }} />

  </div>)
};

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(ProjectView));
