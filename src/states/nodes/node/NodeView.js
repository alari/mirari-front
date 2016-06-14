import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from "material-ui";
import moment from "moment";
import NodeAction from "nodes/components/NodeAction"
import NodeText from "nodes/components/NodeText"
import {TriptychContent} from "commons/triptych";

const mapStateToProps = (state) => ({
  node: state.nodes.node
})

const mapDispatchToProps = {}

const NodeView = (props) => {
  const node = props.node

  return (
      <TriptychContent header={{
      title: node.title
      }}>
        { node && <article style={{padding:"15px"}}>
          
          <NodeText node={node}/>
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

      </TriptychContent>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView)
