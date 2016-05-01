import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map, keys, propOr, isEmpty} from "ramda";
import {TextField, RaisedButton, SelectField, MenuItem, Toggle, LinearProgress, FlatButton} from "material-ui";
import {setChangedFields,saveNode} from "nodes/redux/actions";

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  roles: state.auth.roles || []
})

const mapDispatchToProps = {
}

const NodeAction = (props) => {

  const node = props.node
  
  return (props.userId === node.userId ? props.children : null)
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeAction)
