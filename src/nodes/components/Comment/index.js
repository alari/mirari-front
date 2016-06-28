import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {Avatar, IconMenu, MenuItem} from "material-ui";
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {colors} from "material-ui/styles";
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import Button from 'commons/button';
import {map} from "ramda"
import Markdown from "../Markdown"
import {connect} from "react-redux"

import moment from 'moment';
import {decorateWithState} from "commons/utils"
import CommentForm from "nodes/components/CommentForm"

import {removeNodeComment} from "nodes/redux/actions"

const mapStateToProps = (state) => ({
  pathname: state.resolve.pathname,
  userId: state.auth.userId,
  nodeUserId: state.nodes.node.userId
})

const mapDispatchToProps = {
  actionRemove: (nodeId, commentId) => removeNodeComment(nodeId, commentId)
}

const OnReviewNotice = () =>
  <div className="CommentItem-notice">На модерации</div>;

const CommentView = ({state: {replying = false, v = 0}, setState, comment, nodeId, userId, nodeUserId, actionRemove, updated}) => {

  const reply = () => {
    setState({replying: true})
  }

  const remove = () => {
    actionRemove(nodeId, comment.id).then(updated)
  }

  const replySaved = () => {
    setState({replying: false})
  }

  const replyCancelled = () => {
    setState({replying: false})
  }

  const childUpdated = () => setState({v: v+1})

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
              <a href={"#" + comment.id} id={comment.id}>{moment(comment.dateCreated).fromNow()}</a>
              {comment.replyTo && <span>&gt; <a href={"#" + comment.replyTo}>в ответ</a></span> }
            </time>
          </div>
        </div>
        <div className="CommentItem-body">
          <Markdown content={comment.content} />
        </div>
        { replying ? <CommentForm replyTo={comment.id} onSaved={replySaved} onCancel={replyCancelled} nodeId={nodeId} /> : <div className="CommentItem-footer">
          <Button
            title="Ответить"
            size="sm"
            color="success"
            mobile={true}
            icon={<ReplyIcon />}
            onClick={reply}
          />

          <div className="CommentItem-footerDivider" />

          { (comment.userId === userId || comment.userId === nodeUserId) && <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            { comment.userId === userId && <MenuItem primaryText="Редактировать" />}
            <MenuItem primaryText="Удалить" onClick={remove} />
          </IconMenu> }
        </div> }
      </div>
      { comment.hasOwnProperty("children") && <div className="SubComments">
        { map(c => <Comment key={c.id} comment={c} nodeId={nodeId} updated={childUpdated} />, comment.children) }
      </div>}
    </div>
  )
}

const Comment = connect(mapStateToProps, mapDispatchToProps)(decorateWithState(CommentView))

export default Comment
