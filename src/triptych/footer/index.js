import './styles.css';
import React from 'react';
import { Link } from 'react-router';

const AppFooterItem = ({ title, url }) =>
  <div className="AppFooter-item">
    <Link className="AppFooter-itemLink" to={url}>{title}</Link>
  </div>;

const AppFooter = () =>
  <div className="AppFooter">
    <div className="AppFooter-container">
      <AppFooterItem title="О проекте" url="/about" />
      <AppFooterItem title="Для авторов" url="/for-authors" />
      <AppFooterItem title="Интеграция с Telegram" url="/integration-with-telegram" />
    </div>
  </div>;

export default AppFooter;
