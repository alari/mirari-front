import React from "react";
import {connect} from "react-redux";
import Button from "commons/button";
import EditIcon from "material-ui/svg-icons/image/edit";
import nodeUrl from "nodes/utils/nodeUrl"
import NodeAction from "./index"

const mapStateToProps = (state) => ({
  node: state.nodes.node || null
})

const mapDispatchToProps = {
}

const NodeEditButton = ({node}) =>
  node ? <NodeAction>
    <Button color="default" icon={<EditIcon />} mobile size="m" title="Править" url={nodeUrl(node) + "/edit"} />
  </NodeAction> : null

export default connect(mapStateToProps, mapDispatchToProps)(NodeEditButton)
