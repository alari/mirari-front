import "./styles.css";

import React from "react";
import {connect} from "react-redux"

import CommentForm from "nodes/components/CommentForm";
import Comment from "nodes/components/Comment";
import {map} from "ramda"

const mapStateToProps = (state) => ({
  node: state.nodes.node,
  comments: state.nodes.comments
})

const mapDispatchToProps = {
}

const CommentsView = ({node, comments}) => {
  return (
      <div className="Comments">
        { comments && map(
          (c) => c && <Comment key={c.id} comment={c} nodeId={node.id} updated={() => ""}/>,
          comments || []
        ) }

        <CommentForm nodeId={node.id}/>
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsView)
