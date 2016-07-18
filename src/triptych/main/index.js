import "./styles.css";
import React from "react";
import {connect} from "react-redux";

export const Main = ({children}) =>
  <div className="AppMain">
    { children }
  </div>;

export default Main;
