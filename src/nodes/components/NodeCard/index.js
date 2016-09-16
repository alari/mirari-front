import './styles.css';
import React from 'react';
import { Link } from 'react-router';
import UserImage from 'users/components/UserImage';
import UserLink from 'users/components/UserLink';
import ProjectImage from 'projects/components/ProjectImage';
import ProjectLink from 'projects/components/ProjectLink';
import moment from 'moment';
import kinds from 'nodes/utils/kinds';
import nodeUrl from 'nodes/utils/nodeUrl';

export default ({ node }) => {
  return (node &&
    <article className="Article" itemScope itemType="http://schema.org/Article">
      <div className="Article-header">
        <div className="Article-headerAvatar">
          {node.user && <UserImage user={node.user} />}
          {node.project && <ProjectImage project={node.project} />}
        </div>
        <div className="Article-headerContent">
          {node.user && <div itemProp="author"><UserLink user={node.user} /></div>}
          {node.project && <div itemProp="author"><ProjectLink project={node.project} /></div> }
          { node.published &&
          <span><time dateTime={moment(node.published).format()}
                      itemProp="datePublished">{moment(node.published).fromNow()}</time>
            &thinsp;
            &mdash;
            &thinsp;</span>
          }

          { kinds[node.kind] }

          { node.inSeries && node.inSeries.id && <span>&thinsp;
            &mdash;
            &thinsp;<Link to={nodeUrl(node.inSeries)}>{ node.inSeries.title }</Link></span> }
        </div>
      </div>
      <div className="Article-body">
        <h2 className="Article-title">
          <Link to={nodeUrl(node)} className="Article-titleLink" itemProp="url">{ node.title }</Link>
        </h2>
        {node.imageId &&
        <div className="Cover">
          <div className="Cover-content">
            <img className="Cover-img" src={`/api/images/${node.imageId}`} role="presentation" />
          </div>
        </div>
        }

        { node.description && <p itemProp="description">{ node.description }</p> }
      </div>

    </article>
  )
}
