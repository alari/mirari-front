import './styles.css';
import React from 'react';

import AppFooter from 'triptych/footer';

export const Main = ({ children }) =>
  <div className="AppMain">
    {children}
    <AppFooter />
  </div>;

export default Main;
