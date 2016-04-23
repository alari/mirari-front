import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from 'ramda'
import NodeForm from "nodes/components/NodeForm"

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  
})

const ChangeNodeView = (props) => {

  return (
     <NodeForm />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNodeView)
