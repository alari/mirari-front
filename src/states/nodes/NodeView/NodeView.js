import React from 'react'
import {Link} from "react-router";
import {connect} from "react-redux";
import ReactMarkdown from 'react-markdown'

const mapStateToProps = (state) => ({
  node: state.nodes.node
})

const mapDispatchToProps = (dispatch) => ({
})

const NodeView = (props) => {
  const node = props.node

  return (
      <article>
        <Link to="/">Мирари</Link>

        { node && <article>
          <h1>{ node.title }</h1>

          <div>
            <ReactMarkdown source={node.text.content}/>
          </div>
          </article>}

  </article>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeView)
