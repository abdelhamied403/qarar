import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardImg, Button, Media } from 'reactstrap';
import Link from 'next/link';

import './card-points.css';
import { translate } from '../../../../utlis/translation';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  suffix: 'نقطة'
};

const CardPoints = ({
  avatar,
  name,
  points,
  number,
  icon,
  isDarkCard,
  content,
  link,
  uid,
  suffix
}) => (
  <Card className={isDarkCard ? 'dark-card card-points' : 'card-points'}>
    <CardHeader>
      <div className="flex-header-points">
        <CardImg
          top
          width="100%"
          src={avatar || '/static/img/interactive/user.svg'}
          alt="Card image cap"
        />
        <div className="user-info">
          <Link href={`/user-profile/${uid}`}>
            <a className="sub-header name">{name}</a>
          </Link>
          <span className="points">
            {points} {suffix}
          </span>
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
          <span dir={translate('dir')} className="icon">
            <Media dir={translate('dir')} object src={icon} className="icon-small" />
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
