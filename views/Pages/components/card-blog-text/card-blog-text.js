import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import './card-blog-text.css';
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardBlog extends Component {
  render() {
    // eslint-disable-next-line
    const { header, date, content, tag } = this.props;

    return (
      <Card className="card-blog">
        <CardHeader>
          <div className="header">
            <h6>{header}</h6>
            <span>{date}</span>
          </div>
        </CardHeader>
        <CardBody>
          <div className="content">
            {content}...<Button color="link">المزيد</Button>
          </div>
          <div className="tag">#{tag}</div>
        </CardBody>
      </Card>
    );
  }
}

CardBlog.propTypes = propTypes;
CardBlog.defaultProps = defaultProps;

export default CardBlog;
