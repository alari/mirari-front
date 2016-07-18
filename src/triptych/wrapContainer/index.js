import "./styles.css";
import React from "react";
import {connect} from "react-redux";

export const WrapContainer = ({children}) =>
  <div className="Triptych-wrapContainer">
    { children }
  </div>;

export default WrapContainer;
