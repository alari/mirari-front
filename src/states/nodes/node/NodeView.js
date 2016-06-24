import "./styles.css";
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from "material-ui";
import moment from "moment";
import NodeAction from "nodes/components/NodeAction"
import NodeText from "nodes/components/NodeText"

import Comments from "nodes/components/Comments"

const mapStateToProps = (state) => ({
  node: state.nodes.node
})

const mapDispatchToProps = {}

const ArticleFooterItem = ({ content, itemProp }) => {
  return (
    <div className="ArticleFooter-item" itemProp={itemProp}>{content}</div>
  )
}

const NodeView = ({ node }) => {
  return (
      <section className="Article" itemScope itemType="http://schema.org/Article">
        { node && <article className="Article-body" itemProp="articleBody">

          <NodeText node={node}/>
        </article>}

        <div className="ArticleFooter">
          <ArticleFooterItem content={"Автор: " + node.user.name} itemProp="author" />
          {node.published &&
            <ArticleFooterItem content={moment(node.published).fromNow()} />
          }
          <ArticleFooterItem content={<NodeAction node={node}><Link to={"/my/node/" + node.id}>РЕДАКТИРОВАТЬ</Link></NodeAction>} />
          <ArticleFooterItem content={(node && node.views) + " просмотров"} />
        </div>

        <Comments />
      </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView)
