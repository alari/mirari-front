import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  roles: state.auth.roles || [],
  node: state.nodes.node || null
})

const mapDispatchToProps = {
}

const NodeAction = ({node, userId, roles, children}) =>
  (node && userId && (node.userId === userId || (node.project && node.project.userId === userId))) ? children : null

export default connect(mapStateToProps, mapDispatchToProps)(NodeAction)
