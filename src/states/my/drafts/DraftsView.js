import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from 'ramda'
import { getNodesList } from 'nodes/redux/actions'
import Pagination from "pagination/components/Pagination";
import NodeCard from "nodes/components/NodeCard"

const mapStateToProps = (state) => ({
  nodes: state.nodes.list
})

const mapDispatchToProps = {
  setPage: (p)=>
      getNodesList({...p, draft: true, _expand: "values*user"})
}

const DraftsView = (props) => {

  return (
      <div>

        <h1>Черновики</h1>

        { map((n) => <NodeCard node={n} key={n.id}/>, props.nodes.values) }

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

export default connect(mapStateToProps, mapDispatchToProps)(DraftsView)
