import './styles.css';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'ramda';
import { getProjectsList, saveProject } from 'projects/redux/actions';
import LoadMore from 'commons/pagination/components/LoadMore';
import { Card, CardItem } from 'commons/cards/components';
import { decorateWithState } from 'commons/utils';
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
import pickErrors from 'commons/utils/pickError';
import ProjectImage from 'projects/components/ProjectImage';

const mapStateToProps = (state) => ({
  projects: state.projects.list,
  userId: state.auth.userId,
});

const mapDispatchToProps = {
  setPage: (p) =>
    getProjectsList(p),
  saveProject: ({ data, id, _expand }) =>
    saveProject(data, id, _expand)
};

const CreateProjectView = ({
  state: {
    inProgress = false, error, title = '',
  },
  setState, clearState, stateFieldChanged, saveProject
}) => {

  const pickError = pickErrors(error)

  const action = () => {
    setState({
      error: null,
      inProgress: true
    })
    saveProject({ data: { title } }).then(({ error = false }) => {
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

  return (
    <div className="CreateProject">
      <h3>Создать проект</h3>
      <TextField
        hintText="Название"
        floatingLabelText="Название"
        fullWidth={true}
        onChange={stateFieldChanged('title')}
        value={title}
        errorText={pickError('title')}
      />
      {inProgress ? <LinearProgress /> :
        <RaisedButton label="Сохранить" primary={true} disabled={!title} onClick={action} />
      }
    </div>
  );
};

const CreateProject = decorateWithState(CreateProjectView)

const ProjectsView = ({ projects: { values, total, limit, offset }, userId, setPage, saveProject }) => {
  const haveMore = values.length < total;

  const loadMore = () =>
    setPage({ userId, append: true, limit, offset: offset + limit });

  return (
    <div className="Content">

      <CreateProject saveProject={saveProject} />

      {map(p => <div key={p.id}>
        <ProjectImage project={p} />
        <Card>
          <CardItem>
            <Link to={'/my/projects/' + p.id}>{p.title}</Link>
          </CardItem>
        </Card>
      </div>, values)}

      <LoadMore action={loadMore} haveMore={haveMore} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsView);
