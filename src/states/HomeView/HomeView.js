import "./style.css";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

const HomeView = (props) => {
  return (
      <div>
        <h1>Home View</h1>
        <Link to="/nodes/node-id">GO TO SINGLE NODE</Link>
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
