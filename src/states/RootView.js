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
import {Triptych} from "commons/triptych";

const mapStateToProps = (state) => ({
  title: state.page.title,
  meta: (state.page.meta || []).concat([
    {name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"}
  ]),
  user: state.auth.user
})

const mapDispatchToProps = {
  logout: () =>
      logout(),
  redirectToRoot: () =>
      push("/")
}

const NavList = ({children}) =>
    <ul className="NavList">
      {children}
    </ul>;

const NavListItem = ({title, url}) =>
    <li className="NavList-item">
      <Link className="NavList-link" to={url}>{title}</Link>
    </li>;

const AuthMenu = ({user}) => {
  return (!!user) ? (
      <NavList>
        <NavListItem url="/my/drafts" title="Черновики"/>
        <NavListItem url="/my/notes" title="Заметки"/>
        <NavListItem url="/my/profile" title="Профиль"/>
      </NavList>
  ) : (
      <NavList>
        <NavListItem url="/auth/in" title="Войти"/>
        <NavListItem url="/auth/up" title="Регистрация"/>
      </NavList>
  )
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
        <Triptych
            projectTitle="Мирари"
            onLogout={() => {
                props.logout()
                props.redirectToRoot()
              }}
            isLoggedIn={!!props.user}
            leftPanel={<AuthMenu {...props}/>}
        >
          <Helmet
              title={props.title}
              defaultTitle="Мирари"
              link={[
                {rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:400,300,500&subset=latin,cyrillic",type:"text/css"},
                {rel:"stylesheet",href:"/bundle.css",type:"text/css",media:"screen,projection"}
                ]}
              meta={props.meta}
          />

          { props.children }

        </Triptych>
      </MuiThemeProvider>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RootView)
