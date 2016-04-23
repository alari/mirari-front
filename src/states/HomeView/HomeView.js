import "./style.css";
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from 'ramda'
import { getNodesList } from 'nodes/redux/actions'
import Pagination from "pagination/components/Pagination";
import {logout} from "auth/redux/actions";
import {Card,CardHeader} from "material-ui"
import moment from 'moment'

const mapStateToProps = (state) => ({
  nodes: state.nodes.list
})

const mapDispatchToProps = (dispatch) => ({
  setPage: (p)=> {
    dispatch(getNodesList({...p,_expand:"values*user"}))
  }
})

const NodeSnippet = (node) => {
  return (<Card key={node.id}>
    <CardHeader
        title={<Link to={"/nodes/"+node.id} style={{color:'#333'}}>{ node.title }</Link>}
        subtitle={<span>{node.user.name}{ node.firstPublished && <span>, <i>{moment(node.firstPublished).fromNow()}</i></span> } </span>}
        avatar={node.user.avatarUrl}
    />
  </Card>)
}

const HomeView = (props) => {

  return (
      <div>

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
