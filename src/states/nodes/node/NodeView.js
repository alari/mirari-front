import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import ReactMarkdown from "react-markdown";
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from "material-ui";
import moment from "moment";
import NodeAction from "nodes/components/NodeAction"

const mapStateToProps = (state) => ({
  node: state.nodes.node
})

const mapDispatchToProps = {}

const NodeView = (props) => {
  const node = props.node

  return (
      <div>
        { node && <article style={{padding:"15px"}}>
          <h1>{ node.title }</h1>

          {node.text.content && <ReactMarkdown source={node.text.content}/>}
        </article>}

        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={node.user.name}/>
            {node.firstPublished && <ToolbarTitle text={moment(node.firstPublished).fromNow()}/>}
            <NodeAction node={node}><Link to={"/my/node/" + node.id}>РЕДАКТИРОВАТЬ</Link></NodeAction>
            <ToolbarSeparator />
            <ToolbarTitle text={(node && node.views) + " просмотров"}/>
          </ToolbarGroup>
        </Toolbar>

      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView)
