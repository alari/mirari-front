import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {IconMenu, MenuItem} from "material-ui";
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import Button from 'commons/button';
import {map} from "ramda"
import Markdown from "../Markdown"
import {connect} from "react-redux"

import moment from 'moment';
import {decorateWithState} from "commons/utils"
import CommentForm from "nodes/components/CommentForm"

import {removeNodeComment} from "nodes/redux/actions"

import UserLink from "users/components/UserLink"
import UserImage from "users/components/UserImage"

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

// TODO: rename to somewhat like "sentByApp"? (not "send")
const SentByTelegram = () =>
  <div className="SendByTelegram">
    <span className="SendByTelegram-icon">
      <svg id="telegram-icon" width="14px" height="14px" viewBox="0 0 256 256">
        <path style={{fill: '#2ca5e0', fillOpacity: 1, stroke: 'none'}} d="m 252.71258,127.90582 c 0,68.61302 -55.62185,124.23487 -124.23487,124.23487 -68.613025,0 -124.2348714,-55.62185 -124.2348714,-124.23487 0,-68.613026 55.6218464,-124.2348732 124.2348714,-124.2348732 68.61302,0 124.23487,55.6218472 124.23487,124.2348732 z" />
        <path style={{fill: '#ffffff', fillOpacity: 1, stroke: 'none'}} d="m 155.91221,156.28613 c 3.82213,-10.4461 17.81729,-50.17266 20.06432,-60.591798 2.54062,-11.780443 -2.77796,-12.930544 -14.87454,-8.979356 -12.09657,3.951189 -43.11909,15.449414 -48.34049,17.302714 -5.2214,1.8533 -30.641435,10.39687 -35.911664,12.9461 -10.764524,5.77386 -5.528019,14.58535 6.505791,19.16062 35.967683,17.26467 25.754703,8.46685 41.812423,40.41274 3.30464,8.16089 11.09674,22.06171 18.5597,11.55404 3.92326,-5.97624 9.17875,-23.5903 12.18446,-31.80506 z" />
      </svg>
    </span>
    <span className="SendByTelegram-text">Отправлено через Telegram</span>
  </div>


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
            <UserImage user={comment.user}/>
          </div>
          <div className="CommentItem-headerContent">
            <div>
              <UserLink user={comment.user}/>
              {comment.replyTo && <span> &gt; <a href={"#" + comment.replyTo}>в ответ</a></span> }
            </div>
            <a className="CommentItem-date" href={"#" + comment.id} id={comment.id}>
              <time dateTime={moment(comment.dateCreated).format()} itemProp="datePublished">{moment(comment.dateCreated).fromNow()}
              </time>
            </a>
            { (comment.byApp === "telegram") && <SentByTelegram /> }
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

          { (comment.userId === userId || userId === nodeUserId) && <IconMenu
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
