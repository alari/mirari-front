import React from 'react';
import { connect } from 'react-redux';
import NodesFeed from 'nodes/components/NodesFeed';

const mapStateToProps = (state) => ({
  project: state.projects.project
})

const mapDispatchToProps = {}

const ProjectView = ({ project }) => {

  return (<div>
    <h1>{project.title}</h1>
    {project.imageId && <img src={"/api/images/" + project.imageId + "?q=80"}/>}
    <hr/>

    <NodesFeed filter={{ projectId: project.id }} />
  </div>)

}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)
