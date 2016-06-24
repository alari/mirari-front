import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {TextField} from "material-ui";
import {colors} from "material-ui/styles";

import moment from 'moment';

export default () => {
  return (
    <div className="CommentForm">
      <TextField
        hintText="Full width"
        fullWidth={true}
        multiLine={true}
      />
    </div>
  )
}
