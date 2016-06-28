import "./styles.css";

import React from "react";
import {Link} from "react-router";
import UserImage from "users/components/UserImage"
import UserLink from "users/components/UserLink"

import moment from 'moment';

export default ({node}) => {
  return (node &&
    <article className="Article" itemScope itemType="http://schema.org/Article">
      <div className="Article-header">
        <div className="Article-headerAvatar">
          <UserImage user={node.user}/>
        </div>
        <div className="Article-headerContent">
          <div itemProp="author"><UserLink user={node.user}/></div>
          { node.published &&
            <time dateTime={moment(node.published).format()} itemProp="datePublished">{moment(node.published).fromNow()}</time>
          }
        </div>
      </div>
      <div className="Article-body">
        <h2 className="Article-title">
          <Link to={"/nodes/"+node.id} className="Article-titleLink" itemProp="url">{ node.title }</Link>
        </h2>
        { node.description && <p itemProp="description">{ node.description }</p> }
      </div>

    </article>
  )
}
