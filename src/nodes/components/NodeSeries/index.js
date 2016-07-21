import React, {Component} from "react";
import {connect} from "react-redux";

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {nodeMoveInsideSeries} from "nodes/redux/actions"

import {map, findIndex} from "ramda"

import NodePlace from "./NodePlace"
import NodeLink from "./NodeLink"

const NodeSeries = ({node, moveNode}) => {
  return (<div>
    {node.series && node.series.nodes && <div>
      { map(nd => <NodePlace nodeId={nd.id} key={nd.id}><NodeLink moveNode={(src, trg) => (src !== trg) && moveNode(node, src, trg)} node={nd}/></NodePlace>, node.series.nodes) }
    </div>}
  </div>)
}

export default DragDropContext(HTML5Backend)(connect(null,{
  moveNode: (node, src, trg) =>
    nodeMoveInsideSeries(node.id, src, findIndex(nid => nid === trg, node.series.nodeIds))
})(NodeSeries))
