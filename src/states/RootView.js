import "./style.css";
import React from "react";
import {AppBar, IconMenu, MenuItem, IconButton, Paper} from "material-ui";
import {NavigationMoreVert} from "material-ui/svg-icons";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {green100, green500, green700} from "material-ui/styles/colors";
import {connect} from "react-redux";
import {Link} from "react-router";
import {push} from "react-router-redux";
import {logout} from "commons/auth";
import Helmet from "react-helmet";

const mapStateToProps = (state) => {
  return {
    title: state.page.title,
    meta: (state.page.meta || []).concat([
      {name:"viewport", content:"width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"}
    ]),
    user: state.auth.user
  }
}

const mapDispatchToProps = {
  logout: () =>
      logout(),
  signIn: () =>
      push("/auth/in"),
  signUp: () =>
      push("/auth/up"),
  rootRedirect: () =>
      push("/"),
  draftsRedirect: () =>
      push("/my/drafts"),
  newNodeRedirect: () =>
      push("/my/add-node")

}

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
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  }
    })}>
        <div>
          <Helmet
              title={props.title}
              defaultTitle="Мирари"
              link={[
                {rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:400,300,500&subset=latin,cyrillic",type:"text/css"},
                {rel:"stylesheet",href:"/bundle.css",type:"text/css",media:"screen,projection"}
                ]}
              meta={props.meta}
          />
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