import React from "react";
import {connect} from "react-redux";
import Button from "commons/button";
import EditIcon from "material-ui/svg-icons/image/edit";
import nodeUrl from "nodes/utils/nodeUrl"

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  roles: state.auth.roles || [],
  node: state.nodes.node || null
})

const mapDispatchToProps = {
}

const NodeEditButton = ({node, userId, roles}) =>
  (node && userId && node.userId === userId) ? <Button color="default" icon={<EditIcon />} mobile size="m" title="Править" url={nodeUrl(node) + "/edit"} /> : null

export default connect(mapStateToProps, mapDispatchToProps)(NodeEditButton)
