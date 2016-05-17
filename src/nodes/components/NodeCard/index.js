import React from "react";
import {Link} from "react-router";
import {Card,CardHeader} from "material-ui"
import moment from 'moment'

export default (props) => {
  const node = props.node
  return (node && <Card>
    <CardHeader
        title={<Link to={"/nodes/"+node.id} style={{color:'#333'}}>{ node.title }</Link>}
        subtitle={<span>{node.user.name}{ node.firstPublished && <span>, <i>{moment(node.firstPublished).fromNow()}</i></span> } </span>}
        avatar={node.user.imageId ? ("/api/images/"+node.user.imageId + "?q=80&w=80&h=80&m=cover") : node.user.avatarUrl}
    />
  </Card>)
}