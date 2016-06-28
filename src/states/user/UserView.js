import React from 'react'
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  user: state.users.user
})

const mapDispatchToProps = {
}

const UserView = ({user: {imageId, avatarUrl}}) => <div>
  {(imageId || avatarUrl) && <img style={{margin:'auto'}} src={imageId ? ("/api/images/"+imageId) : avatarUrl}/>}
</div>

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
