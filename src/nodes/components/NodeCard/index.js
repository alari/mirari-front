import React from "react";
import {Link} from "react-router";
import {Avatar} from "material-ui";
import {colors} from "material-ui/styles";

import {Card, CardItem, CardDivider, CardRows, CardRow} from "commons/cards/components";
import moment from 'moment';

export default ({node}) => {
  return (node &&
    <Card itemScope itemType="http://schema.org/Article">
      <CardItem>
        <Avatar
          color={ colors.deepOrange300 }
          backgroundColor={ colors.purple500 }
          src={node.user.imageId ? ("/api/images/"+node.user.imageId + "?q=80&w=80&h=80&m=cover") : node.user.avatarUrl}
        />
      </CardItem>
      <CardItem>
        <CardRows>
          <Link to={"/nodes/"+node.id} className="Card-titleLink" itemProp="url">{ node.title }</Link>
        </CardRows>
        <CardRows>
          <CardRow itemProp="author">{node.user.name}</CardRow>
          <CardRow>
            { node.firstPublished && <span>, <i>{moment(node.firstPublished).fromNow()}</i></span> }
          </CardRow>
        </CardRows>
      </CardItem>
    </Card>
  )
}
