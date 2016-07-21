import "./styles.css";
import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from "material-ui";
import moment from "moment";
import NodeAction from "nodes/components/NodeAction"
import NodeText from "nodes/components/NodeText"
import NodeCard from "nodes/components/NodeCard"

import kinds from "nodes/utils/kinds"
import UserLink from "users/components/UserLink"

import Comments from "nodes/components/Comments"

import nodeUrl from "nodes/utils/nodeUrl"
import {map, findIndex, find, drop, take, reverse} from "ramda"

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
  const seriesSiblings = (node.inSeries && node.inSeries.series && node.inSeries.series.nodes) || []
  const currentIndex = findIndex(n => n.id === node.id, seriesSiblings)
  const nextNode = (currentIndex >= 0 && find(n => !!n.id, drop(currentIndex+1, seriesSiblings)))
  const prevNode = (currentIndex >= 0 && find(n => !!n.id, reverse(take(currentIndex, seriesSiblings))))

  return node && (
      <section className="Content Article" itemScope itemType="http://schema.org/Article">
        <article className="Article-body" itemProp="articleBody">
          <NodeText node={node}/>
        </article>

        {node.series && node.series.nodes && map(n => <NodeCard node={n} key={n.id}/>, node.series.nodes)}

        <div className="ArticleFooter">
          <ArticleFooterItem content={<UserLink user={node.user}/>} itemProp="author" />
          <ArticleFooterItem content={kinds[node.kind]} />
          {
            node.inSeries && <ArticleFooterItem content={<Link to={nodeUrl(node.inSeries)}>{node.inSeries.title}</Link>}/>
          }
          {node.published &&
            <ArticleFooterItem content={moment(node.published).fromNow()} />
          }
          <ArticleFooterItem content={<NodeAction node={node}><Link to={"/my/node/" + node.id}>Редактировать</Link></NodeAction>} />
          <ArticleFooterItem content={(node && node.views) + " просмотров"} />
        </div>

        { (nextNode || prevNode) && <div>
          {prevNode && <Link to={nodeUrl(prevNode)}>&larr; {prevNode.title}</Link>}
          { node.inSeries &&  <Link to={nodeUrl(node.inSeries)}>{node.inSeries.title}</Link>}
          {nextNode && <Link to={nodeUrl(nextNode)}>{nextNode.title} &rarr;</Link>}
        </div> }

        <Comments />
      </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView)
