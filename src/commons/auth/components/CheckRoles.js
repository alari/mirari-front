import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { intersection, map, toLower } from 'ramda';

class AccessDenied extends React.Component {
  render(){
    return <span>403: Access denied</span>
  }
}

export default (Component, roles) => {

  const lower = map(toLower)

  class RolesCheckComponent extends React.Component {

    render() {
      const rolesIntersection = intersection(lower(roles), lower(this.props.userRoles || []));
      return (
        <div>
          {rolesIntersection.length !== 0
            ? <Component {...this.props}/>
            : <AccessDenied {...this.props}/>
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    userRoles: state.auth.roles
  });

  return connect(mapStateToProps)(RolesCheckComponent);
}
