import React from 'react';
import { connect } from 'react-redux';
import NodesFeed from 'nodes/components/NodesFeed';
import ProjectImage from 'projects/components/ProjectImage';

const mapStateToProps = (state) => ({
  project: state.projects.project
})

const mapDispatchToProps = {}

const ProjectView = ({ project }) => {

  return (<div>
    <ProjectImage project={project} />

    <NodesFeed filter={{ projectId: project.id }} />
  </div>)

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)
