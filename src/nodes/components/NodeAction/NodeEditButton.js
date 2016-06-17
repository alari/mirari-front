import React from "react";
import {connect} from "react-redux";
import Button from "commons/button";
import EditIcon from "material-ui/svg-icons/image/edit";

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  roles: state.auth.roles || [],
  node: state.nodes.node || null
})

const mapDispatchToProps = {
}

const NodeEditButton = ({node, userId, roles}) =>
  (node && userId && node.userId === userId) ? <Button color="default" icon={<EditIcon />} mobile size="sm" title="Править" url={"/nodes/"+node.id+"/edit"} /> : null

export default connect(mapStateToProps, mapDispatchToProps)(NodeEditButton)
