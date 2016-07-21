import './styles.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'ramda';
import { getNodesList } from 'nodes/redux/actions';
import LoadMore from 'commons/pagination/components/LoadMore';
import { Card, CardItem } from 'commons/cards/components';
import moment from 'moment';
import NoteForm from 'nodes/components/NoteForm';

const mapStateToProps = (state) => ({
  nodes: state.nodes.list,
  nodeId: state.resolve.params.nodeId,
  q: state.resolve.query.q || '',
});

const mapDispatchToProps = {
  setPage: (p) =>
    getNodesList({ ...p, layer: 'Draft' }),
};

const NotesView = ({ nodes, setPage, nodeId, q }) => {

  const haveMore = nodes.values.length < nodes.total;

  const loadMore = () =>
    setPage({ q, append: true, limit: nodes.limit, offset: nodes.offset + nodes.limit });

  return (
    <div className="Notes">
      <div className="Notes-container">
        <div className="Notes-list">
          {map((n) =>
            <Card key={n.id} isActive={n.id === nodeId}>
              <CardItem>
                <Link to={"/my/notes/" + n.id}>
                  {n.title || '***'}, {moment(n.lastUpdated).fromNow()}
                </Link>
              </CardItem>
            </Card>, nodes.values)
          }

          <LoadMore action={loadMore} haveMore={haveMore} />
        </div>
        <div className="Notes-content">
          {!q && <NoteForm />}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesView);
