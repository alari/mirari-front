import './styles.css';
import React from 'react';
import classnames from 'classnames';

const AppHeader = ({ button, isCenter, title }) => {
  const rootClasses = classnames(
    'AppHeader-top-title',
    {
      'AppHeader-top-title--center': isCenter,
    }
  );

  return (
    <div className="AppHeader">
      <div className="AppHeader-container AppHeader-top">
        <h2 className={rootClasses}>{title}</h2>
        <div className="AppHeader-rightControl">{button}</div>
      </div>
    </div>
  );
};

export default AppHeader;
