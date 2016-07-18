import React from 'react'
import {Link} from 'react-router'

export default ({user: {id, username, name}}) => <Link to={"/" + (username || ("users/" + id))}>{name}</Link>
