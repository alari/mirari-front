import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from "ramda";
import {getNodesList} from "nodes/redux/actions";
import NodeCard from "nodes/components/NodeCard";
import LoadMore from "commons/pagination/components/LoadMore";

const mapStateToProps = (state) => ({
  nodes: state.nodes.list
})

const mapDispatchToProps = {
  setPage: (p)=>
      getNodesList({...p, layer: "Draft", _expand: "values*user"})
}

const DraftsView = ({nodes, setPage}) => {

  const haveMore = nodes.values.length < nodes.total

  const loadMore = () => setPage({append: true, limit: nodes.limit, offset: nodes.offset + nodes.limit})

  return (
      <div>

        { map((n) => <NodeCard node={n} key={n.id}/>, nodes.values) }

        <LoadMore action={loadMore} haveMore={haveMore}/>

      </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftsView)
