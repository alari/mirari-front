import './styles.css';
import React from 'react';

const AppHeader = ({ button, title }) =>
  <div className="AppHeader">
    <div className="AppHeader-container AppHeader-top">
      <h2 className="AppHeader-top-title">{title}</h2>
      <div className="AppHeader-rightControl">{button}</div>
    </div>
  </div>;

export default AppHeader;
