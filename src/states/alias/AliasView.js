import React from "react";
import NodeView from "../nodes/node/NodeView";
import UserView from "../users/UserView";
import {connect} from "react-redux";
import {TriptychContent, TriptychWrapContent, TriptychRight} from "triptych";
import NodeEditButton from "nodes/components/NodeAction/NodeEditButton";


const mapStateToProps = (state) => ({
  alias: state.aliases.current || {}
})

const mapDispatchToProps = {}


const AliasView = ({alias, children}) => {
  return (
    <TriptychWrapContent>
      <TriptychContent header={{
        title: (alias.node && alias.node.title) || (alias.user && alias.user.name),
        isCenter: true,
        button: alias.node && <NodeEditButton />
      }}>

        {
          (alias.user && <UserView/>) || (alias.node && <NodeView/>) || "404"
        }

      </TriptychContent>

      {children && <TriptychRight>{children}</TriptychRight>}

    </TriptychWrapContent>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AliasView)
