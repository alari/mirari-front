import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {Avatar} from "material-ui";
import {colors} from "material-ui/styles";

import moment from 'moment';

export default ({node}) => {
  return (node &&
    <article className="Article" itemScope itemType="http://schema.org/Article">
      <div className="Article-header">
        <div className="Article-headerAvatar">
          <Avatar
            color={ colors.deepOrange300 }
            backgroundColor={ colors.purple500 }
            src={node.user.imageId ? ("/api/images/"+node.user.imageId + "?q=80&w=80&h=80&m=cover") : node.user.avatarUrl}
          />
        </div>
        <div className="Article-headerContent">
          <div itemProp="author">{node.user.name}</div>
          { node.firstPublished && <span>, <em>{moment(node.firstPublished).fromNow()}</em></span> }
        </div>
      </div>
      <div className="Article-body">
        <h2 className="Article-title">
          <Link to={"/nodes/"+node.id} className="Article-titleLink" itemProp="url">{ node.title }</Link>
        </h2>
        <p>
          Млечный Путь ничтожно представляет собой первоначальный спектральный класс. Солнечное затмение представляет собой эллиптический параллакс. Скоpость кометы в пеpигелии вероятна. Туманность Андромеды отражает pадиотелескоп Максвелла.
        </p>
      </div>

    </article>
  )
}
