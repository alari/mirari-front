import React from 'react';
import { DropTarget } from 'react-dnd';

const NodePlaceView = ({ children, connectDropTarget, isOver, canDrop }) =>
  connectDropTarget(
    <div
      className="NodeSeries-item"
      style={{ backgroundColor: isOver && (canDrop ? '#ebfbeb' : '#ffefef') }}
    >
      {children}
    </div>
  );

const nodeTarget = {
  canDrop(props) {
    return true;
  },

  drop(props, monitor) {
    return { nodeId: props.nodeId };
  },
};

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget("node", nodeTarget, collectTarget)(NodePlaceView);
