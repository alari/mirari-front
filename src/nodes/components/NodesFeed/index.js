import React from "react";
import {connect} from "react-redux";
import {map} from "ramda";
import {getNodesList} from "nodes/redux/actions";
import NodeCard from "nodes/components/NodeCard";
import LoadMore from "commons/pagination/components/LoadMore";

const mapStateToProps = (state) => ({
  nodes: state.nodes.list
})

const mapDispatchToProps = {
  setPage: (p)=> getNodesList(p)
}

const NodesFeedView = ({filter = {}, nodes: {values = [], total = 0, limit, offset} = {}, setPage}) => {
  const haveMore = (offset + limit) < total

  const loadMore = () => setPage({...filter, append: true, limit, offset: offset + limit})

  return (
    <div className="Content">

      { map((n) => <NodeCard node={n} key={n.id}/>, values) }

      <LoadMore action={loadMore} haveMore={haveMore}/>

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NodesFeedView)
