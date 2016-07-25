import React from 'react'
import NodeForm from "nodes/components/NodeForm"
import NodeText from "nodes/components/NodeText"
import {decorateWithState} from "commons/utils"
import Button from "commons/button"
import {connect} from "react-redux"

const mapStateToProps = (state) => ({
  node: state.nodes.node
})

const NoteView = ({state: {isEditing = false}, setState, node}) => <div>
  <div><Button onClick={() => setState({isEditing: !isEditing})} title={isEditing ? "В просмотр" : "Редактировать"}/></div>
  {isEditing ? <NodeForm/> : <NodeText node={node}/>}
</div>

export default connect(mapStateToProps)(decorateWithState(NoteView))
