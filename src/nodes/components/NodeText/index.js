import React from "react";
import ReactMarkdown from "react-markdown";
import {equals, length} from "ramda"
import ReactPlayer from 'react-player'

const renderers = {
  Paragraph: React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
      return !equals(nextProps,this.props);
    },

    render: function() {
      const children = this.props.children

      if(length(children) === 1 && typeof children[0] === "string" && ReactPlayer.canPlay(children[0])) {
        return (<ReactPlayer url={children[0]}/>)
      } else {
        return (<p>{children}</p>)
      }
    }
  })
}

export default (props) => {
  const node = props.node
  const content = node.text.content

  return (!!content ? <ReactMarkdown
      softBreak="br"
      renderers={renderers}
      source={content}
  /> : null)
}