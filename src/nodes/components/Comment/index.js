import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {Avatar, RaisedButton} from "material-ui";
import {colors} from "material-ui/styles";
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import Button from 'commons/button';
import {map} from "ramda"

import moment from 'moment';
import {decorateWithState} from "commons/utils"
import CommentForm from "nodes/components/CommentForm"

const ModerateNotice = () =>
  <div className="CommentItem-notice">На модерации</div>;

const CommentView = ({state: {replying = false}, setState, comment, nodeId}) => {

  const reply = () => {
    setState({replying: true})
  }

  const replySaved = () => {
    setState({replying: false})
  }


  return (
    <div className="CommentItem">
      <div className="CommentItem-container">
        <div className="CommentItem-header">
          <div className="CommentItem-headerAvatar">
            <Avatar
              color={ colors.deepOrange300 }
              backgroundColor={ colors.purple500 }
              src={comment.user.imageId ? ("/api/images/"+comment.user.imageId + "?q=80&w=80&h=80&m=cover") : comment.user.avatarUrl}
            />
          </div>
          <div className="CommentItem-headerContent">
            <div>{comment.user.name}</div>
            <time dateTime={moment(comment.dateCreated).format()} itemProp="datePublished">
              {moment(comment.dateCreated).fromNow()}
            </time>
          </div>
        </div>
        <div className="CommentItem-body">
          { comment.content && <p>{ comment.content }</p> }
        </div>
        { replying ? <CommentForm replyTo={comment.id} onSaved={replySaved} nodeId={nodeId} /> : <div className="CommentItem-footer">
          <RaisedButton label="Ответить" icon={<ReplyIcon />} onClick={reply} />
        </div> }

        <div>
          { map(c => <Comment key={c.id} comment={c} nodeId={nodeId} />, comment.children) }
        </div>

      </div>
    </div>
  )
}

const Comment = decorateWithState(CommentView)

export default Comment
