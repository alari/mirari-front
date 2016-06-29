import React from 'react'
import {connect} from "react-redux";
import NodesFeed from "nodes/components/NodesFeed"
import UserImage from "users/components/UserImage"

const mapStateToProps = (state) => ({
  user: state.users.user
})

const mapDispatchToProps = {
}

const UserView = ({user}) => {

 return (<div>
   <UserImage user={user} />

   <NodesFeed filter={{userId: user.id}} />
  </div>)

}

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
