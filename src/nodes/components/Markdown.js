import React from 'react';
import ReactMarkdown from 'react-markdown';
import { equals, length } from 'ramda';
import ReactPlayer from 'react-player';

const renderers = {
  Paragraph: React.createClass({
    shouldComponentUpdate(nextProps, nextState) {
      return !equals(nextProps, this.props);
    },

    render() {
      const children = this.props.children

      if (length(children) === 1 && typeof children[0] === 'string' && ReactPlayer.canPlay(children[0])) {
        return (
          <div className="Player">
          <ReactPlayer className="Player-content" url={children[0]} controls={true} />
          </div>
        );
      } else {
        return (<p>{children}</p>);
      }
    },
  }),
}

export default ({ content }) => (!!content ? <ReactMarkdown
  softBreak="br"
  renderers={renderers}
  source={content}
/> : null);
