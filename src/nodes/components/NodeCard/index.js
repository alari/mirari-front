import React from "react";
import {Link} from "react-router";
import {Card,CardHeader} from "material-ui"
import moment from 'moment'

export default (props) => {
  const node = props.node
  return (node && <Card key={node.id}>
    <CardHeader
        title={<Link to={"/nodes/"+node.id} style={{color:'#333'}}>{ node.title }</Link>}
        subtitle={<span>{node.user.name}{ node.firstPublished && <span>, <i>{moment(node.firstPublished).fromNow()}</i></span> } </span>}
        avatar={node.user.avatarUrl}
    />
  </Card>)
}