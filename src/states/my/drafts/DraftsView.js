import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {map} from "ramda";
import {getNodesList} from "nodes/redux/actions";
import NodeCard from "nodes/components/NodeCard";
import {TriptychContent} from "commons/triptych";
import LoadMore from "commons/pagination/components/LoadMore";
import Button from "commons/button";
import AddIcon from "material-ui/svg-icons/content/add";

const mapStateToProps = (state) => ({
  nodes: state.nodes.list
})

const mapDispatchToProps = {
  setPage: (p)=>
      getNodesList({...p, draft: true, _expand: "values*user"})
}

const DraftsView = ({nodes, setPage}) => {

  const haveMore = nodes.values.length < nodes.total

  const loadMore = () => setPage({append: true, limit: nodes.limit, offset: nodes.offset + nodes.limit})

  return (
      <TriptychContent header={{
      title:"Черновики",
      buttonChild: <Button color="default" icon={<AddIcon />} mobile size="sm" title="Добавить" url="/my/add-node" />,}}>

        { map((n) => <NodeCard node={n} key={n.id}/>, nodes.values) }

        <LoadMore action={loadMore} haveMore={haveMore}/>

      </TriptychContent>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftsView)
