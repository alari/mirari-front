import React from 'react';
import NodeForm from 'nodes/components/NodeForm';
import NodeText from 'nodes/components/NodeText';
import { decorateWithState } from 'commons/utils';
import Button from 'commons/button';
import { connect } from 'react-redux';
import { map } from 'ramda';
import { Link } from 'react-router';

const mapStateToProps = (state) => ({
  node: state.nodes.node,
});

const NoteView = ({ state: { isEditing = false }, setState, node }) =>
  <div>
    <div className="Notes-controls">
      <Button
        onClick={() => setState({ isEditing: !isEditing })}
        title={isEditing ? 'В просмотр' : 'Редактировать'}
      />
    </div>
    {isEditing ? <NodeForm /> : <NodeText node={node} />}

    {node.pinnedToNodes &&
      <div>
        <hr />
        {map(p =>
          <Link
            key={p.id}
            to={`/my/node/${p.id}`}
            style={{ fontSize: 'small', color: 'gray', padding: '1rem' }}
          >
            {p.title}
          </Link>, node.pinnedToNodes)
        }
      </div>
    }
  </div>;

export default connect(mapStateToProps)(decorateWithState(NoteView));
