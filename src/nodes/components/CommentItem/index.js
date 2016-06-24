import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {Avatar} from "material-ui";
import {colors} from "material-ui/styles";

import moment from 'moment';

export default ({node}) => {
  return (node &&
    <div className="CommentItem">
      <div className="CommentItem-header">
        <div className="CommentItem-headerAvatar">
          <Avatar
            color={ colors.deepOrange300 }
            backgroundColor={ colors.purple500 }
            src={node.user.imageId ? ("/api/images/"+node.user.imageId + "?q=80&w=80&h=80&m=cover") : node.user.avatarUrl}
          />
        </div>
        <div className="CommentItem-headerContent">
          <div>{node.user.name}</div>
          { node.published &&
            <time dateTime={moment(node.published).format()} itemProp="datePublished">{moment(node.published).fromNow()}</time>
          }
        </div>
      </div>
      <div className="CommentItem-body">
        { node.description && <p>{ node.description }</p> }
      </div>
      <div className="CommentItem-footer">
        <button>Ответить</button>
      </div>
    </div>
  )
}
