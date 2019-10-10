import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardImg, Button, Media } from 'reactstrap';
import Link from 'next/link';
import './card-blog.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

const CardBlog = ({
  image,
  header,
  date,
  content,
  tag,
  blogId,
  tagId,
  subHeader,
  subHeaderIcon
}) => (
  <Card className="card-blog">
    <CardHeader>
      <CardImg top width="100%" src={image} alt="Card image cap" />
    </CardHeader>
    <CardBody>
      <div className="header">
        <h5>{header}</h5>
        <div className="sub-header">
          {subHeaderIcon ? (
            <Media object src={subHeaderIcon} className="icon-small" />
          ) : (
            // <i className={subHeaderIcon}></i>
            ''
          )}

          <span>{date} </span>
        </div>
      </div>
      <div className="content">
        {content}...
        <Button
          href={`/client/platform-news-image/${blogId}`}
          tag={Link}
          color="link"
        >
          <a>المزيد</a>
        </Button>
      </div>
      <Link
        className="tag sub-header"
        exact
        href={`/client/tag/${tagId}`}
        tag={Link}
      >
        <a>#{tag}</a>
      </Link>
    </CardBody>
  </Card>
);

CardBlog.propTypes = propTypes;
CardBlog.defaultProps = defaultProps;

export default CardBlog;
