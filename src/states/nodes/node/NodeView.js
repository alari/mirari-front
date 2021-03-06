import "./styles.css";
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from "material-ui";
import moment from "moment";
import NodeAction from "nodes/components/NodeAction"
import NodeText from "nodes/components/NodeText"

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
      <section itemScope itemType="http://schema.org/Article">
        { node && <article itemProp="articleBody">

          <NodeText node={node}/>
        </article>}

        <div className="ArticleFooter">
          <ArticleFooterItem content={"Автор: " + node.user.name} itemProp="author" />
          {node.firstPublished &&
            <ArticleFooterItem content={moment(node.firstPublished).fromNow()} />
          }
          <ArticleFooterItem content={<NodeAction node={node}><Link to={"/my/node/" + node.id}>РЕДАКТИРОВАТЬ</Link></NodeAction>} />
          <ArticleFooterItem content={(node && node.views) + " просмотров"} />
        </div>
      </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView)
