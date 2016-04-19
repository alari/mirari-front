import "./style.css";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from 'ramda'
import { getNodesList } from 'nodes/redux/actions'
import Pagination from "pagination/components/Pagination";
import {logout} from "auth/redux/actions";


const mapStateToProps = (state) => ({
  nodes: state.nodes.list,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  setPage: (p)=> {
    dispatch(getNodesList({...p,_expand:"values*user"}))
  },
  logout: () => {
    dispatch(logout())
  }
})

const NodeSnippet = (node) => {
  return (<article key={node.id}>
    <b><Link to={"/nodes/"+node.id}>{ node.title }</Link></b><br/>
    <i>{ node.user.name }</i>
  </article>)
}

const HomeView = (props) => {

  return (
      <div>
        <div>
          {!!props.user ?
              <span>Привет, {props.user.name}. <a onClick={props.logout}>Выйти</a></span> :
              <Link to="/auth/in">Вход</Link>
          }
        </div>

        <h1>Мирари</h1>

        { map(NodeSnippet, props.nodes.values) }

        <Pagination
            setPage={ props.setPage }
            limit={props.nodes.limit}
            offset={props.nodes.offset}
            total={props.nodes.total}
            itemsLength={props.nodes.values.length}
        />
        
      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
