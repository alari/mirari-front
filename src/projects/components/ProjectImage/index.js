import React from 'react';
import ProjectLink from 'projects/components/ProjectLink';
import { Avatar } from 'material-ui';
import { colors } from 'material-ui/styles';


export default ({ project }) => {
  const { imageId } = project
  return (<ProjectLink project={project}>
    <Avatar
      color={ colors.deepOrange300 }
      backgroundColor={ colors.purple500 }
      src={imageId ? ("/api/images/" + imageId + "?q=80&w=80&h=80&m=cover") : "/assets/favicon/apple-icon.png"}
    />
  </ProjectLink>)
}
