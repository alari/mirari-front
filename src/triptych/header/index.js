import './styles.css';
import React from 'react';

const AppHeader = ({ button, title }) =>
  <div className="AppHeader">
    <div className="AppHeader-container AppHeader-top">
      <div className="AppHeader-top-title">{title}</div>
      <div className="AppHeader-rightControl">{button}</div>
    </div>
  </div>;

export default AppHeader;
