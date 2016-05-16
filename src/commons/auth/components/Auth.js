import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

class RedirectToLogin extends React.Component {
  componentWillMount() {
    let redirectAfterLogin = this.props.location.pathname;
    this.props.dispatch(push(`/login?next=${ redirectAfterLogin }`))
  }

  render(){
    return <span>redirecting to login</span>
  }
}

export default (Component) => {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.token) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push(`/login?next=${ redirectAfterLogin }`));
        return false
      }
      return true
    }

    render() {
      return (
        <div>
          {this.props.token !== undefined
            ? <Component {...this.props}/>
            : <RedirectToLogin {...this.props}/>
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    location: state.routing.locationBeforeTransitions
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
