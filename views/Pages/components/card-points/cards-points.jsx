import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardImg, Button, Media } from 'reactstrap';
import Link from 'next/link';

import './card-points.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

const CardPoints = ({
  avatar,
  name,
  points,
  number,
  icon,
  isDarkCard,
  content,
  link
}) => (
  <Card className={isDarkCard ? 'dark-card card-points' : 'card-points'}>
    <CardHeader>
      <div className="flex-header-points">
        <CardImg top width="100%" src={avatar} alt="Card image cap" />
        <div className="user-info">
          <Link href="/user-profile/userid">
            <a className="sub-header name">{name}</a>
          </Link>
          <span className="points">{points} نقطة</span>
        </div>
      </div>
    </CardHeader>
    <CardBody>
      {content ? (
        <p>
          {content}
          {link ? (
            <Button color="link">
              <Link href={link}>
                <a>المزيد</a>
              </Link>
            </Button>
          ) : (
            ''
          )}
        </p>
      ) : (
        <div className="icons-cont">
          <span className="icon">
            <Media object src={icon} className="icon-small" />
            {/* <i className={icon + " icons d-block"}></i> */}
          </span>
          <span>{number}</span>
        </div>
      )}
    </CardBody>
  </Card>
);

CardPoints.propTypes = propTypes;
CardPoints.defaultProps = defaultProps;

export default CardPoints;
