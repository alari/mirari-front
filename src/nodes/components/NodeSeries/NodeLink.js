import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import { DragSource } from "react-dnd";
import nodeUrl from "nodes/utils/nodeUrl";

const NodeSortableView = ({node, connectDragSource, isDragging}) =>
  connectDragSource(<div style={{
        opacity: isDragging ? 0.5 : 1
      }}><Link to={nodeUrl(node)}>{node.title}</Link></div>)

const nodeSource = {
  beginDrag(props) {
    return {nodeId: props.node.id};
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      props.moveNode(props.node.id, monitor.getDropResult().nodeId)
    }
  }
}

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource("node", nodeSource, collectSource)(NodeSortableView)
