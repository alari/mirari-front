import './styles.css';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'ramda';
import { getNodesList } from 'nodes/redux/actions';
import LoadMore from 'commons/pagination/components/LoadMore';
import { Card, CardItem } from 'commons/cards/components';
import moment from 'moment';
import NodeForm from 'nodes/components/NodeForm';
import { TriptychContent, TriptychWrapContent } from 'triptych';
import Button from 'commons/button';
import AddIcon from 'material-ui/svg-icons/content/add';

const mapStateToProps = (state) => ({
  nodes: state.nodes.list,
  nodeId: state.resolve.params.nodeId,
  q: state.resolve.query.q || '',
  title: state.page.title,
});

const mapDispatchToProps = {
  setPage: (p) =>
    getNodesList({ ...p, layer: 'Note' }),
};

const NotesView = ({ nodes, setPage, nodeId, q, children, title }) => {
  const haveMore = nodes.values.length < nodes.total;

  const loadMore = () =>
    setPage({ q, append: true, limit: nodes.limit, offset: nodes.offset + nodes.limit });

  return (
    <TriptychWrapContent>
      <TriptychContent
        header={{
          title,
          button: <Button
            color="default"
            icon={<AddIcon />}
            mobile
            size="m"
            title="Заметка"
            url="/my/notes"
            disabled={!nodeId}
          />,
        }}
      >
        <div className="Notes">
          <div className="Notes-container">
            <div className="Notes-list">
              <div className="Notes-listContainer">
                {map((n) =>
                  <Card key={n.id} isActive={n.id === nodeId}>
                    <CardItem>
                      <Link to={`/my/notes/${n.id}`}>
                        {n.title || '***'}, {moment(n.lastUpdated).fromNow()}
                      </Link>

                      {n.pinnedToNodes &&
                      <div>
                        {map(p =>
                          <Link
                            key={p.id}
                            to={`/my/node/${p.id}`}
                            style={{ fontSize: 'small', color: 'gray', display: 'block' }}
                          >
                            {p.title}
                          </Link>, n.pinnedToNodes)
                        }
                      </div>
                      }
                    </CardItem>
                  </Card>, nodes.values)
                }

                <LoadMore action={loadMore} haveMore={haveMore} />
              </div>
            </div>
            <div className="Notes-content">
              {children || <NodeForm mixin={{ layer: 'Note' }} />}
            </div>
          </div>
        </div>
      </TriptychContent></TriptychWrapContent>
  );
};

NotesView.propTypes = {
  nodes: PropTypes.list,
  setPage: PropTypes.func,
  nodeId: PropTypes.string,
  q: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesView);
