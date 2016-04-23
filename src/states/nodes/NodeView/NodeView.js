import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import ReactMarkdown from "react-markdown";
import {
  Toolbar,
ToolbarGroup,
ToolbarTitle
} from "material-ui"
import moment from 'moment'

const mapStateToProps = (state) => ({
  node: state.nodes.node
})

const mapDispatchToProps = (dispatch) => ({})

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
            <ToolbarTitle text={moment(node.dateCreated).fromNow()}/>
          </ToolbarGroup>
        </Toolbar>

      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView)
