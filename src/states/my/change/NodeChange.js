import React from 'react'
import {TriptychContent,TriptychWrapContent} from "commons/triptych"
import NodeForm from "nodes/components/NodeForm"

export default (props) => {
  return (<TriptychWrapContent><TriptychContent>

    <NodeForm />

  </TriptychContent></TriptychWrapContent>)
}
