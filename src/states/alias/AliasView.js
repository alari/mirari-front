import React from 'react';
import NodeView from '../nodes/node/NodeView';
import UserView from '../users/UserView';
import ProjectView from '../projects/ProjectView';
import { connect } from 'react-redux';
import { TriptychContent, TriptychWrapContent, TriptychRight } from 'triptych';
import NodeEditButton from 'nodes/components/NodeAction/NodeEditButton';


const mapStateToProps = (state) => ({
  alias: state.aliases.current || {}
})

const mapDispatchToProps = {}


const AliasView = ({ alias, children }) => {
  return (
    <TriptychWrapContent>
      <TriptychContent
        header={{
          title: (alias.node && alias.node.title) ||
          (alias.user && alias.user.name) ||
          (alias.project && alias.project.title),
          button: alias.node && <NodeEditButton />
        }}>

        {
          (alias.user && <UserView />) ||
          (alias.node && <NodeView />) ||
          (alias.project && <ProjectView />) ||
          '404'
        }

      </TriptychContent>

      {children && <TriptychRight>{children}</TriptychRight>}

    </TriptychWrapContent>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AliasView)
