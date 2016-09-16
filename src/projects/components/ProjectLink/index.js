import React from 'react';
import { Link } from 'react-router';

export default ({ project: { id, alias, title }, children }) => <Link
  to={"/" + (alias || ("projects/" + id))}>{children || title}</Link>
