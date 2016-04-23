import React from "react";
import {AppBar, IconMenu, MenuItem, IconButton, Paper} from "material-ui";
import {NavigationMoreVert} from "material-ui/svg-icons";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {purple500, purple700, purple100} from "material-ui/styles/colors";
import {connect} from "react-redux";
import {Link} from "react-router";
import {push} from "react-router-redux";
import {logout} from "auth/redux/actions";

const mapStateToProps = (state) => {
  console.log(state)
  return {
    title: state.page.title,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout())
  },
  signIn: () => {
    dispatch(push("/auth/in"))
  },
  signUp: () => {
    dispatch(push("/auth/up"))
  },
  rootRedirect: () => {
    dispatch(push("/"))
  },
  draftsRedirect: () => {
    dispatch(push("/my/drafts"))
  },
  newNodeRedirect: () => {
    dispatch(push("/my/add-node"))
  }
})

const AuthMenu = (props) => {
  const content = () => {
    if (!!props.user) {
      return (
          <div>
            <MenuItem onClick={props.newNodeRedirect} primaryText="+ Добавить"/>
            <MenuItem onClick={props.draftsRedirect} primaryText="Черновики"/>
            <MenuItem onClick={props.logout} primaryText="Выход" secondaryText={props.user.name}/>
          </div>
      )
    } else {
      return (
          <div>
            <MenuItem onClick={props.signIn} primaryText="Войти"/>
            <MenuItem onClick={props.signUp} primaryText="Регистрация"/>
          </div>
      )
    }
  }

  return (<IconMenu
      iconButtonElement={
          <IconButton><NavigationMoreVert /></IconButton>
        }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >

    {content()}


  </IconMenu>)
}

const RootView = (props) => {
  return (
      <MuiThemeProvider muiTheme={getMuiTheme({
    palette: {
    primary1Color: purple500,
    primary2Color: purple700,
    primary3Color: purple100,
  }
    })}>
        <div>
          <AppBar
              showMenuIconButton={false}
              title="М."
              iconElementRight={<AuthMenu {...props}/>}
              onTitleTouchTap={props.rootRedirect}
          />

          <Paper style={{maxWidth:"812px",margin:"auto"}}>
            { props.children }
          </Paper>
        </div>
      </MuiThemeProvider>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RootView)