import React from 'react';
import UserLink from 'users/components/UserLink';
import { Avatar } from 'material-ui';
import { colors } from 'material-ui/styles';


export default ({ user }) => {
  const { imageId, avatarUrl } = user
  return (<UserLink user={user}>
    <Avatar
      color={ colors.deepOrange300 }
      backgroundColor={ colors.purple500 }
      src={imageId ? ("/api/images/" + imageId + "?q=80&w=80&h=80&m=cover") : avatarUrl}
    />
  </UserLink>)
}
