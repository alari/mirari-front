import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from "ramda";
import NodeForm from "nodes/components/NodeForm";
import {TriptychContent} from "commons/triptych";

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

const AddNodeView = (props) => {

  return (
      <TriptychContent>
        <NodeForm />
      </TriptychContent>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNodeView)
