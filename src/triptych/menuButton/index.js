import "./styles.css";
import React from "react";
import Menu from "material-ui/svg-icons/navigation/menu";
import Button from "commons/button";

const MenuButton = () => {
  return (
    <div className="MenuButton" id="triptych-open-menu">
      <div className="MenuButton-container">
        <span className="MenuButton-line" />
        <span className="MenuButton-line" />
        <span className="MenuButton-line" />
        <span className="MenuButton-line" />
      </div>
    </div>
  );
};

export default MenuButton;
