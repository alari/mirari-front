import React from "react";
import Markdown from "../Markdown"

export default (props) => {
  const node = props.node
  const content = node.text.content

  return <Markdown content={content} />
}
