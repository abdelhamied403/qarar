import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardImg } from 'reactstrap';
import './card-icon.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardIcon extends Component {
  render() {
    // eslint-disable-next-line
    const { image, header, date, content, tag } = this.props;

    return (
      <Card className="card-icon">
        <CardHeader>
          <CardImg top width="100%" src={image} alt="Card image cap" />
        </CardHeader>
        <CardBody>
          <div className="card-header">
            <h6>{header}</h6>
          </div>
          <div className="content">
            <p>{content}</p>
          </div>
        </CardBody>
      </Card>
    );
  }
}

CardIcon.propTypes = propTypes;
CardIcon.defaultProps = defaultProps;

export default CardIcon;
