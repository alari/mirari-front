import "./styles.css";
import React from "react";
import {connect} from "react-redux";
import classnames from "classnames";
import Grid from "react-material-grid";
import {IconButton} from "material-ui";
import {decorateWithState, urlInterpolateStrict} from "commons/utils";
import {Link} from "react-router";
import Close from "material-ui/svg-icons/navigation/close";
import WrapContainer from "./wrapContainer/index";
import Main from "./main/index";
import Header from "./header/index";
import MenuButton from 'triptych/menuButton';

const AppLeftPanel = ({children, projectTitle, onLogout, isLoggedIn}) => {
  return (
      <div className="AppLeftPanel" id="triptych-menu">
        <div className="AppLeftPanel-container">
          <div className="AppLeftPanel-header">
            <Link className="AppLeftPanel-logoLink" to="/">{ projectTitle }</Link>
          </div>
          { children }
        </div>
        { isLoggedIn && <div className="AppLeftPanel-footer">
          <a className="AppLeftPanel-footerLink" onClick={onLogout}>Выйти</a>
        </div> }
      </div>
  );
};

export const TriptychContent = ({header, children}) =>
    <WrapContainer>
      <Header {...header}/>
      <Main>{children}</Main>
    </WrapContainer>

export const TriptychRight = connect(
    (state) => ({
      params: state.resolve.params,
      query: state.resolve.query
    })
)(({children, onCloseTo, onClose, params, query}) => {
  const link = onCloseTo && urlInterpolateStrict(onCloseTo, params, query)

  return (<div className="AppRightPanel">
    <div className="AppRightPanel-container">
      <div className="AppRightPanel-header">
        <div className="AppRightPanel-closeBtnContainer">
          { link && <Link to={link}>
            <IconButton><Close /></IconButton>
          </Link> }
          { onClose && <IconButton onClick={onClose}><Close /></IconButton>}
        </div>
      </div>
      <div className="AppRightPanel-main">
        { children }
      </div>
    </div>
  </div>);
})

export const TriptychWrapContent = ({children}) =>  <div className="Triptych-wrapContent">
  {children}
</div>

export const TriptychMainWrapper = (Component, onCloseTo) => ({children, ...props}) =>
    <TriptychWrapContent>
      <Component {...props}/>
      {children && <TriptychRight onCloseTo={onCloseTo}>{ children }</TriptychRight> }
    </TriptychWrapContent>

export const TriptychFullWrapper = (Component, onCloseTo, header = {}) => connect(
    state => ({
      title: state.page.title
    })
)(({children, title, ...props}) =>
    <TriptychWrapContent>
      <TriptychContent
          header={{
          title,
          ...header
        }}>
        <Component {...props}/>
      </TriptychContent>
      {children && <TriptychRight onCloseTo={onCloseTo}>{ children }</TriptychRight> }
    </TriptychWrapContent>)

const TriptychView = ({
    leftPanel = "leftPanel",
    projectTitle = "",
    onLogout = () => "",
    isLoggedIn,
    children, state, setState
}) => {
  const TriptychClasses = classnames(
      'Triptych',
      {'is-LeftPanelOpened': state.leftPanelActive === 'opened'},
      {'is-LeftPanelHidden': state.leftPanelActive === 'hidden'},
  );
  const closeOnClick = (e) => {
    let el = e.target;
    let inPanel = false;
    let onLink = false;
    let menuOpen = false;
    do {
      if(el.tagName === 'A' || el.tagName === "a") {
        onLink = true;
      }
      if (el.id === "triptych-menu") {
        inPanel = true;
        break;
      }
      if (el.id === "triptych-open-menu") {
        menuOpen = true;
        break;
      }
    } while (el = el.parentNode)
    if ((!inPanel || onLink) && state.leftPanelActive === 'opened' && (typeof window !== 'undefined' && window.innerWidth < 1280)) setState({leftPanelActive: 'hidden'})

    if (menuOpen) switch (state.leftPanelActive) {
      case 'opened':
        setState({leftPanelActive: 'hidden'});
        break;
      case 'hidden':
        setState({leftPanelActive: 'opened'});
        break;
      case 'default':
        setState({leftPanelActive: (typeof window !== 'undefined' && window.innerWidth < 1280) ? 'opened' : 'hidden'});
        break;
    }
  }
  return (
      <Grid className={TriptychClasses} layout="column" onClick={closeOnClick}>
        <MenuButton />
        <AppLeftPanel
            projectTitle={projectTitle}
            onLogout={onLogout}
            isLoggedIn={isLoggedIn}
        >{ leftPanel }</AppLeftPanel>
        <div className="Triptych-wrap">
          {children}
        </div>
      </Grid>
  )
}

export const Triptych = decorateWithState(TriptychView, {initialState: {leftPanelActive: 'hidden'}})
