import "./styles.css";

import React from "react";
import {Link} from "react-router";
import {Avatar} from "material-ui";
import {colors} from "material-ui/styles";

import moment from 'moment';

import CommentForm from "nodes/components/CommentForm";
import CommentItem from "nodes/components/CommentItem";

export default ({node}) => {
  return (node &&
    <div className="Comments">
      <CommentItem />
      <CommentForm />
    </div>
  )
}
