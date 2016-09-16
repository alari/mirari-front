import React from 'react';
import { Link } from 'react-router';

export default ({ user: { id, username, name }, children }) => <Link
  to={"/" + (username || ("users/" + id))}>{children || name}</Link>
