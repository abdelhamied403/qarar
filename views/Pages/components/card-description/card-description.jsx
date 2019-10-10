import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Media } from 'reactstrap';
// import Link from 'next/Link';

import './card-description.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

const CardDescription = ({ header, type, arrayOfContnt, points }) => (
  <Card className="card-description">
    <CardHeader className="header">
      {header} <div> {points}</div>
    </CardHeader>
    <CardBody>
      {arrayOfContnt.map(content => {
        if (type === 'social') {
          return (
            <div className="socail-item">
              <a className="h6">{content.header}</a>
              <div className="flex-icons">
                {content.social.map(s => {
                  return (
                    <span className="social-icon">
                      {/* <i className={s.icon + " icons d-block"}></i> */}
                      <Media object src={s.icon} className="icon-small" />

                      <span>{s.number}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        }
        return (
          <div className="desc-item">
            <a className="h6">{content.header}</a>
            {content.description.map(s => {
              return (
                <span className="desc-content">
                  <Media object src={s.icon} className="icon-small" />

                  {/* <i className={s.icon + " icons d-block"}></i> */}
                  <span>{s.text}</span>
                </span>
              );
            })}
          </div>
        );
      })}
    </CardBody>
  </Card>
);

CardDescription.propTypes = propTypes;
CardDescription.defaultProps = defaultProps;

export default CardDescription;
