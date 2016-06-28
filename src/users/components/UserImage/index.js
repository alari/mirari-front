import React from 'react'
import {Link} from 'react-router'
import {Avatar} from "material-ui";
import {colors} from "material-ui/styles";


export default ({user: {id, username, name, imageId, avatarUrl}}) => <Link to={"/" + (username || id)}>
  <Avatar
    color={ colors.deepOrange300 }
    backgroundColor={ colors.purple500 }
    src={imageId ? ("/api/images/"+imageId + "?q=80&w=80&h=80&m=cover") : avatarUrl}
  />
</Link>
