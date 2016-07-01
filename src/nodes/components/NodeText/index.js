import React from "react";
import Markdown from "../Markdown"

export default ({node}) => {
  const content = node.text.content

  return <Markdown content={content} />
}
